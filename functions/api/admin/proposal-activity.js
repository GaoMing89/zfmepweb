import { audit, requireSession, verifyCsrf } from '../../_lib/auth.js';
import { error, json, readJson, sameOrigin } from '../../_lib/http.js';

export async function onRequestGet(context) {
  const auth = await requireSession(context, ['admin']);
  if (auth.response) return auth.response;
  const proposalId = new URL(context.request.url).searchParams.get('proposalId') || '';
  const rows = await context.env.DB.prepare(
    `SELECT ps.id, ps.created_at, ps.last_seen_at, ps.expires_at, ps.ip_prefix,
            ps.country_code, ps.region, ps.region_code, ps.city, ps.timezone,
            ps.device_type, ps.browser_name, COALESCE(ps.active_seconds, 0) AS active_seconds,
            COALESCE(ps.visitor_type, 'customer') AS visitor_type, ps.internal_user_id,
            iu.display_name AS internal_display_name, iu.account AS internal_account,
            pk.id AS key_id, pk.customer_name, pk.code_prefix,
            p.id AS proposal_id, p.title, p.slug
       FROM proposal_sessions ps
       JOIN proposal_keys pk ON pk.id = ps.proposal_key_id
       JOIN proposals p ON p.id = pk.proposal_id
       LEFT JOIN users iu ON iu.id = ps.internal_user_id
      WHERE (?1 = '' OR p.id = ?1)
      ORDER BY ps.created_at DESC
      LIMIT 200`
  ).bind(proposalId).all();
  return json({ ok: true, activity: rows.results || [] });
}

export async function onRequestPatch(context) {
  if (!sameOrigin(context.request)) return error(403, '请求来源无效。', 'invalid_origin');
  const auth = await requireSession(context, ['admin']);
  if (auth.response) return auth.response;
  if (!verifyCsrf(context, auth.session)) return error(403, '安全校验失败。', 'invalid_csrf');

  let body;
  try { body = await readJson(context.request); }
  catch (_) { return error(400, '访问记录格式不正确。', 'invalid_request'); }

  const id = String(body.id || '').trim();
  const visitorType = body.visitorType === 'internal' ? 'internal' : body.visitorType === 'customer' ? 'customer' : '';
  if (!id || !visitorType) return error(400, '访问记录资料不完整。', 'invalid_request');

  const result = await context.env.DB.prepare(
    `UPDATE proposal_sessions
        SET visitor_type = ?1,
            internal_user_id = CASE WHEN ?1 = 'internal' THEN ?2 ELSE NULL END
      WHERE id = ?3`
  ).bind(visitorType, auth.session.user_id, id).run();
  if (!Number(result.meta?.changes || 0)) return error(404, '访问记录不存在。', 'activity_not_found');

  await audit(context, auth.session, 'proposal.activity.classify', 'proposal_session', id, JSON.stringify({ visitorType }));
  return json({ ok: true });
}
