import { requireSession } from '../../_lib/auth.js';
import { json } from '../../_lib/http.js';

export async function onRequestGet(context) {
  const auth = await requireSession(context, ['admin']);
  if (auth.response) return auth.response;
  const proposalId = new URL(context.request.url).searchParams.get('proposalId') || '';
  const rows = await context.env.DB.prepare(
    `SELECT ps.id, ps.created_at, ps.last_seen_at, ps.expires_at, ps.ip_prefix,
            ps.country_code, ps.region, ps.region_code, ps.city, ps.timezone,
            ps.device_type, ps.browser_name, COALESCE(ps.active_seconds, 0) AS active_seconds,
            pk.id AS key_id, pk.customer_name, pk.code_prefix,
            p.id AS proposal_id, p.title, p.slug
       FROM proposal_sessions ps
       JOIN proposal_keys pk ON pk.id = ps.proposal_key_id
       JOIN proposals p ON p.id = pk.proposal_id
      WHERE (?1 = '' OR p.id = ?1)
      ORDER BY ps.created_at DESC
      LIMIT 200`
  ).bind(proposalId).all();
  return json({ ok: true, activity: rows.results || [] });
}
