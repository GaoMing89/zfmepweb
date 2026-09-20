export async function onRequest(context) {
  const response = await context.env.ASSETS.fetch(context.request);
  const headers = new Headers(response.headers);
  headers.set('cache-control', 'public, max-age=0, must-revalidate');
  headers.set('x-robots-tag', 'noindex, nofollow');
  return new Response(response.body, { status: response.status, headers });
}
