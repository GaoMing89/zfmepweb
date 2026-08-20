import { error, json, readJson, sameOrigin, cookie, clientIpPrefix } from '../_lib/http.js';
import { randomToken, sha256 } from '../_lib/crypto.js';
import { PROPOSAL_COOKIE, resolveProposalVisitorContext } from '../_lib/proposal-auth.js';

const HASH_COLUMNS = ['code_hash','key_hash','access_key_hash','secret_hash','token_hash','hash'];
const RAW_COLUMNS = ['code','access_code','key_code'];

async function columns(db, table) {
  const result = await db.prepare(`PRAGMA table_info(${table})`).all();
  return new Set((result.results || []).map((row) => row.name));
}

function firstExisting(set, candidates) {
  return candidates.find((name) => set.has(name)) || null;
}

function quoted(name) {
  return `"${String(name).replace(/"/g, '""')}"`;
}

function isoOr(value, fallback) {
  const time = Date.parse(value || '');
  return Number.isFinite(time) ? new Date(time).toISOString() : fallback;
}

export async function onRequestPost(context) {
  try {
    if (!sameOrigin(context.request)) return error(403, '请求来源无效。', 'origin_forbidden');
    if (!context.env.DB) return error(503, '提案授权服务暂不可用。', 'database_unavailable');

    const body = await readJson(context.request);
    const code = String(body.code || '').trim();
    const expectedProposal = String(body.proposal || '').trim();
    if (!code || code.length < 4 || code.length > 256) return error(400, '请输入有效的访问密钥。', 'invalid_code');
    if (expectedProposal && !/^[a-z0-9-]+$/.test(expectedProposal)) return error(400, '提案标识无效。', 'invalid_proposal');

    const db = context.env.DB;
    const keyCols = await columns(db, 'proposal_keys');
    const proposalCols = await columns(db, 'proposals');
    const sessionCols = await columns(db, 'proposal_sessions');
    if (!keyCols.size || !proposalCols.size || !sessionCols.size) return error(503, '提案授权数据尚未就绪。', 'proposal_schema_missing');

    const hashCol = firstExisting(keyCols, HASH_COLUMNS);
    const rawCol = firstExisting(keyCols, RAW_COLUMNS);
    if (!hashCol && !rawCol) return error(503, '提案密钥结构无法识别。', 'proposal_key_schema_unknown');

    let key = null;
    if (hashCol) {
      const digest = await sha256(code);
      key = await db.prepare(`SELECT * FROM proposal_keys WHERE ${quoted(hashCol)} = ?1 LIMIT 1`).bind(digest).first();
    }
    if (!key && rawCol) key = await db.prepare(`SELECT * FROM proposal_keys WHERE ${quoted(rawCol)} = ?1 LIMIT 1`).bind(code).first();
    if (!key) return error(401, '访问密钥不正确。', 'invalid_key');

    const now = Date.now();
    if (key.status && key.status !== 'active') return error(403, '该访问密钥已失效。', 'key_revoked');
    if (key.expires_at && Date.parse(key.expires_at) <= now) return error(403, '该访问密钥已到期。', 'key_expired');
    if (key.max_views != null && key.view_count != null && Number(key.view_count) >= Number(key.max_views)) return error(403, '该访问密钥的授权次数已用尽。', 'key_limit_reached');

    let proposal = null;
    if (key.proposal_id != null && proposalCols.has('id')) proposal = await db.prepare('SELECT * FROM proposals WHERE id = ?1 LIMIT 1').bind(key.proposal_id).first();
    if (!proposal && key.slug && proposalCols.has('slug')) proposal = await db.prepare('SELECT * FROM proposals WHERE slug = ?1 LIMIT 1').bind(key.slug).first();
    if (!proposal) return error(404, '未找到对应提案。', 'proposal_not_found');
    if (proposal.status && proposal.status !== 'active') return error(403, '该提案当前未开放。', 'proposal_disabled');

    const slug = String(proposal.slug || key.slug || '').trim();
    if (!/^[a-z0-9-]+$/.test(slug)) return error(503, '提案路径配置无效。', 'proposal_slug_invalid');
    if (expectedProposal && slug !== expectedProposal) return error(403, '该密钥不属于当前提案。', 'proposal_mismatch');

    const token = randomToken(32);
    const tokenHash = await sha256(token);
    const sessionId = randomToken(18);
    const nowIso = new Date().toISOString();
    const twelveHours = new Date(now + 12 * 60 * 60 * 1000).toISOString();
    const keyExpiry = isoOr(key.expires_at, twelveHours);
    const expiresAt = new Date(Math.min(Date.parse(keyExpiry), Date.parse(twelveHours))).toISOString();
    const visitor = await resolveProposalVisitorContext(context.request, body.client);

    const fields = [];
    const placeholders = [];
    const values = [];
    const add = (name, value) => {
      if (!sessionCols.has(name)) return;
      fields.push(quoted(name));
      values.push(value);
      placeholders.push(`?${values.length}`);
    };

    add('id', sessionId);
    add('proposal_key_id', key.id);
    add('token_hash', tokenHash);
    add('expires_at', expiresAt);
    add('last_seen_at', nowIso);
    add('created_at', nowIso);
    add('ip_prefix', clientIpPrefix(context.request));
    add('country_code', visitor.countryCode);
    add('region', visitor.region);
    add('region_code', visitor.regionCode);
    add('city', visitor.city);
    add('timezone', visitor.timezone);
    add('device_type', visitor.deviceType);
    add('browser_name', visitor.browserName);
    add('active_seconds', 0);

    if (!fields.includes(quoted('proposal_key_id')) || !fields.includes(quoted('token_hash')) || !fields.includes(quoted('expires_at'))) {
      return error(503, '提案会话结构不完整。', 'proposal_session_schema_unknown');
    }

    await db.prepare(`INSERT INTO proposal_sessions (${fields.join(',')}) VALUES (${placeholders.join(',')})`).bind(...values).run();
    if (keyCols.has('view_count')) await db.prepare('UPDATE proposal_keys SET view_count = COALESCE(view_count, 0) + 1 WHERE id = ?1').bind(key.id).run();

    const redirect = String(proposal.content_path || `/proposal/${slug}/`);
    const maxAge = Math.max(60, Math.floor((Date.parse(expiresAt) - now) / 1000));
    return json({ ok: true, redirect }, { headers: { 'set-cookie': cookie(PROPOSAL_COOKIE, token, { maxAge }) } });
  } catch (failure) {
    console.error('proposal-access', failure);
    return error(500, '暂时无法验证访问密钥，请稍后重试。', 'proposal_access_failed');
  }
}
