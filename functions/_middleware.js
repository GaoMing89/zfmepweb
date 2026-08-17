import { error } from "./_lib/http.js";

export async function onRequest(context) {
  if (!context.env.DB) return error(503, "维保数据库尚未连接。", "database_unavailable");

  const response = await context.next();
  const headers = new Headers(response.headers);
  headers.set("referrer-policy", "strict-origin-when-cross-origin");
  headers.set("permissions-policy", "camera=(self), geolocation=(), microphone=()");
  headers.set("x-frame-options", "SAMEORIGIN");
  headers.set("content-security-policy", "default-src 'self'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-inline'; connect-src 'self' https://api.open-meteo.com https://formsubmit.co; form-action 'self' https://formsubmit.co; frame-ancestors 'self'; base-uri 'self'");

  const secured = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });

  const url = new URL(context.request.url);
  const contentType = headers.get("content-type") || "";
  const isHome = url.pathname === "/" || url.pathname === "/index.html";
  if (!isHome || !contentType.includes("text/html") || response.status !== 200) return secured;

  return new HTMLRewriter()
    .on("body", {
      element(element) {
        element.append(`
          <a href="/proposal-access/" class="zf-private-proposal-key" aria-label="专属提案" title="专属提案">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M14.5 3a6.5 6.5 0 0 0-5.98 9.03L3 17.55V21h3.45l1.5-1.5H10v-2h2v-2h1.55l.42-.42A6.5 6.5 0 1 0 14.5 3Zm3 5.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"/>
            </svg>
            <span>专属提案</span>
          </a>
          <style>
            .zf-private-proposal-key{position:fixed;top:18px;right:22px;z-index:9999;display:inline-flex;align-items:center;gap:8px;height:40px;padding:0 14px;border:1px solid rgba(255,255,255,.24);border-radius:999px;background:#245b4b;color:#fff!important;text-decoration:none!important;font:600 12px/1 Inter,"PingFang SC","Microsoft YaHei",sans-serif;letter-spacing:.03em;box-shadow:0 10px 28px rgba(22,58,48,.20);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);transition:transform .18s ease,box-shadow .18s ease,background .18s ease}
            .zf-private-proposal-key svg{width:17px;height:17px;fill:currentColor;flex:none}
            .zf-private-proposal-key:hover{transform:translateY(-1px);background:#1d4d40;box-shadow:0 13px 32px rgba(22,58,48,.26)}
            .zf-private-proposal-key:focus-visible{outline:3px solid rgba(36,91,75,.24);outline-offset:3px}
            @media(max-width:760px){.zf-private-proposal-key{top:14px;right:14px;width:42px;height:42px;padding:0;justify-content:center}.zf-private-proposal-key span{display:none}.zf-private-proposal-key svg{width:18px;height:18px}}
          </style>
        `, { html: true });
      }
    })
    .transform(secured);
}
