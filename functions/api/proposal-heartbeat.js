import { error, json, readJson, sameOrigin } from '../_lib/http.js';
import { clearProposalCookie, getProposalSession, proposalVisitorContext } from '../_lib/proposal-auth.js';

export async function onRequestPost(context) {
  if (!sameOrigin(context.request)) return error(403, '请求来源无效。', 'invalid_origin');

  let body;
  try { body = await readJson(context.request); }
  catch (_) { return error(400, '浏览记录格式不正确。', 'invalid_request'); }

  const slug = String(body.proposal || '').trim().slice(0, 80);
  const requestedSeconds = Number(body.activeSeconds || 0);
  if (!/^[a-z0-9-]+$/.test(slug) || !Number.isFinite(requestedSeconds)) {
    return error(400, '浏览记录格式不正确。', 'invalid_request');
  }

  const result = await getProposalSession(context, slug);
  if (result.state !== 'active') {
    const response = error(401, '提案访问授权无效或已到期。', 'proposal_access_required');
    response.headers.set('set-cookie', clearProposalCookie());
    return response;
  }

  const activeSeconds = Math.max(0, Math.min(60, Math.round(requestedSeconds)));
  const visitor = proposalVisitorContext(context.request);
  await context.env.DB.prepare(
    `UPDATE proposal_sessions
        SET active_seconds = COALESCE(active_seconds, 0) + ?1,
            last_heartbeat_at = CURRENT_TIMESTAMP,
            last_seen_at = CURRENT_TIMESTAMP,
            country_code = COALESCE(country_code, ?3),
            region = COALESCE(region, ?4),
            region_code = COALESCE(region_code, ?5),
            city = COALESCE(city, ?6),
            timezone = COALESCE(timezone, ?7),
            device_type = COALESCE(device_type, ?8),
            browser_name = COALESCE(browser_name, ?9)
      WHERE id = ?2`
  ).bind(
    activeSeconds, result.row.session_id, visitor.countryCode, visitor.region, visitor.regionCode,
    visitor.city, visitor.timezone, visitor.deviceType, visitor.browserName
  ).run();

  return json({ ok: true, activeSeconds });
}
