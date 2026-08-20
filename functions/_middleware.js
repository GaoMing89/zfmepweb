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
  const proposalMatch = url.pathname.match(/^\/proposal\/([a-z0-9-]+)\/(?:index\.html)?$/);
  if (proposalMatch && contentType.includes("text/html") && response.status === 200) {
    const slug = proposalMatch[1];
    return new HTMLRewriter()
      .on('script[src*="proposal-telemetry.js"]', {
        element(element) { element.remove(); }
      })
      .on("body", {
        element(element) {
          element.append(
            `<script src="/proposal-telemetry.js?v=20260820-analytics-fix-v1" data-proposal="${slug}" defer></script>`,
            { html: true }
          );
        }
      })
      .transform(secured);
  }

  const isHome = url.pathname === "/" || url.pathname === "/index.html";
  if (!isHome || !contentType.includes("text/html") || response.status !== 200) return secured;

  return new HTMLRewriter()
    .on("head", {
      element(element) {
        element.append(`
          <style id="zf-proposal-key-restored">
            html body .desktop-nav > .header-action.zf-proposal-key {
              display:inline-flex !important;
              align-items:center !important;
              justify-content:center !important;
              flex:0 0 38px !important;
              width:38px !important;
              height:38px !important;
              min-width:38px !important;
              padding:0 !important;
              margin-left:4px !important;
              border:0 !important;
              border-radius:50% !important;
              background:#245b4b !important;
              color:#fff !important;
              text-decoration:none !important;
              box-shadow:0 5px 14px rgba(20,70,58,.16) !important;
              line-height:1 !important;
              transition:background .18s ease, transform .18s ease, box-shadow .18s ease !important;
            }
            html body .desktop-nav > .header-action.zf-proposal-key::after { display:none !important; }
            html body .desktop-nav > .header-action.zf-proposal-key svg {
              width:17px !important;
              height:17px !important;
              display:block !important;
              fill:none !important;
              stroke:currentColor !important;
              stroke-width:2 !important;
              stroke-linecap:round !important;
              stroke-linejoin:round !important;
            }
            html body .desktop-nav > .header-action.zf-proposal-key:hover {
              background:#1c4d40 !important;
              transform:translateY(-1px) !important;
              box-shadow:0 7px 18px rgba(20,70,58,.22) !important;
            }
            html body .desktop-nav > .header-action.zf-proposal-key:focus-visible {
              outline:3px solid rgba(36,91,75,.22) !important;
              outline-offset:3px !important;
            }
            @media(max-width:900px){
              html body .desktop-nav > .header-action.zf-proposal-key { display:none !important; }
            }
          </style>
        `, { html: true });
      }
    })
    .on("nav.desktop-nav", {
      element(element) {
        element.append(`
          <a class="header-action zf-proposal-key" href="/proposal-access/" aria-label="专属提案" title="专属提案">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <circle cx="8" cy="15" r="4"></circle>
              <path d="M11 12l7-7"></path>
              <path d="M16 5l3 3"></path>
              <path d="M14.5 8.5l2 2"></path>
            </svg>
          </a>
        `, { html: true });
      }
    })
    .transform(secured);
}
