import { getProposalSession, proposalAccessReason } from '../../_lib/proposal-auth.js';

export async function onRequest(context) {
  const result = await getProposalSession(context, 'jiangshanjing-fresh-air');
  if (result.state !== 'active') {
    const reason = proposalAccessReason(result.state);
    return Response.redirect(new URL(`/proposal-access/?reason=${reason}`, context.request.url), 302);
  }
  const response = await context.env.ASSETS.fetch(context.request);
  const headers = new Headers(response.headers);
  headers.set('cache-control', 'private, no-store, max-age=0');
  headers.set('cross-origin-resource-policy', 'same-origin');
  headers.set('x-robots-tag', 'noindex, nofollow, noarchive');
  return new Response(response.body, { status: response.status, headers });
}
