import { clientIpPrefix, cookie, getCookie } from './http.js';
import { sha256 } from './crypto.js';

export const PROPOSAL_COOKIE = 'zf_proposal';

function cleanClientValue(value, allowed = null) {
  const normalized = String(value || '').trim().slice(0, 80);
  if (!normalized) return null;
  return allowed && !allowed.includes(normalized) ? null : normalized;
}

export function proposalVisitorContext(request, client = {}) {
  const cf = request.cf || {};
  const userAgent = request.headers.get('user-agent') || '';
  let deviceType = 'desktop';
  if (/ipad|tablet|playbook|silk/i.test(userAgent)) deviceType = 'tablet';
  else if (/mobile|iphone|ipod|android/i.test(userAgent)) deviceType = 'mobile';

  let browserName = '其他浏览器';
  if (/MicroMessenger/i.test(userAgent)) browserName = '微信';
  else if (/Edg\//i.test(userAgent)) browserName = 'Edge';
  else if (/Firefox|FxiOS/i.test(userAgent)) browserName = 'Firefox';
  else if (/Chrome|CriOS/i.test(userAgent)) browserName = 'Chrome';
  else if (/Safari/i.test(userAgent)) browserName = 'Safari';

  const clientDevice = cleanClientValue(client.deviceType, ['mobile', 'tablet', 'desktop']);
  const clientBrowser = cleanClientValue(client.browserName, ['微信', 'Edge', 'Firefox', 'Chrome', 'Safari', '其他浏览器']);

  return {
    countryCode: cf.country || request.headers.get('cf-ipcountry') || null,
    region: cf.region || null,
    regionCode: cf.regionCode || null,
    city: cf.city || null,
    timezone: cf.timezone || cleanClientValue(client.timezone) || null,
    deviceType: clientDevice || deviceType,
    browserName: browserName === '其他浏览器' ? (clientBrowser || browserName) : browserName
  };
}

export async function resolveProposalVisitorContext(request, client = {}) {
  const visitor = proposalVisitorContext(request, client);
  if (visitor.city) return visitor;

  const ip = request.headers.get('cf-connecting-ip') || '';
  if (!ip || ip === 'unknown' || ip.length > 64) return visitor;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1200);
  try {
    const response = await fetch(
      `https://ipwho.is/${encodeURIComponent(ip)}?fields=success,country_code,region,city,timezone`,
      { signal: controller.signal, cf: { cacheEverything: true, cacheTtl: 86400 } }
    );
    if (!response.ok) return visitor;
    const geo = await response.json();
    if (!geo?.success) return visitor;
    visitor.countryCode ||= cleanClientValue(geo.country_code);
    visitor.region ||= cleanClientValue(geo.region);
    visitor.city ||= cleanClientValue(geo.city);
    visitor.timezone ||= cleanClientValue(geo.timezone?.id || geo.timezone);
  } catch (_) {
    // Location is supplemental; access and time tracking must still succeed.
  } finally {
    clearTimeout(timeout);
  }
  return visitor;
}

export async function getProposalSession(context, expectedSlug = null) {
  const token = getCookie(context.request, PROPOSAL_COOKIE);
  if (!token) return { state: 'missing' };
  const tokenHash = await sha256(token);
  const row = await context.env.DB.prepare(
    `SELECT ps.id AS session_id, ps.expires_at AS session_expires_at,
            pk.id AS key_id, pk.customer_name, pk.status AS key_status,
            pk.expires_at AS key_expires_at, pk.max_views, pk.view_count,
            p.slug, p.title, p.status AS proposal_status
       FROM proposal_sessions ps
       JOIN proposal_keys pk ON pk.id = ps.proposal_key_id
       JOIN proposals p ON p.id = pk.proposal_id
      WHERE ps.token_hash = ?1
      LIMIT 1`
  ).bind(tokenHash).first();
  if (!row) return { state: 'missing' };
  const now = Date.now();
  if (row.proposal_status !== 'active' || row.key_status === 'revoked') return { state: 'revoked', row };
  if (Date.parse(row.key_expires_at) <= now || Date.parse(row.session_expires_at) <= now) return { state: 'expired', row };
  if (row.max_views != null && Number(row.view_count) > Number(row.max_views)) return { state: 'revoked', row };
  if (expectedSlug && row.slug !== expectedSlug) return { state: 'forbidden', row };
  await context.env.DB.prepare(`UPDATE proposal_sessions SET last_seen_at = CURRENT_TIMESTAMP WHERE id = ?1`).bind(row.session_id).run();
  return { state: 'active', row };
}

export function clearProposalCookie() {
  return cookie(PROPOSAL_COOKIE, '', { maxAge: 0, expires: new Date(0) });
}

export function proposalAccessReason(state) {
  if (state === 'expired') return 'expired';
  if (state === 'revoked' || state === 'forbidden') return 'revoked';
  return 'required';
}

export async function proposalAudit(context, keyId, action, detail = null) {
  await context.env.DB.prepare(
    `INSERT INTO audit_logs (action, entity_type, entity_id, detail, ip_prefix)
     VALUES (?1, 'proposal_key', ?2, ?3, ?4)`
  ).bind(action, keyId || null, detail, clientIpPrefix(context.request)).run();
}
