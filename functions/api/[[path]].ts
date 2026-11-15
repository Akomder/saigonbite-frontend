const apiOrigin = 'https://saigonbite-api.vercel.app';

export const onRequest: PagesFunction = async ({ request }) => {
  const upstreamUrl = new URL(request.url);
  upstreamUrl.protocol = 'https:';
  upstreamUrl.hostname = new URL(apiOrigin).hostname;
  upstreamUrl.port = '';

  const headers = new Headers(request.headers);
  headers.set('Origin', new URL(request.url).origin);

  const upstreamRequest = new Request(upstreamUrl, {
    method: request.method,
    headers,
    body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
    redirect: 'manual'
  });
  const response = await fetch(upstreamRequest);
  const responseHeaders = new Headers(response.headers);
  responseHeaders.set('Cache-Control', 'no-store');
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders
  });
};
