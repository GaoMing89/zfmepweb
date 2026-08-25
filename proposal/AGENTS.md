# Protected Proposal Rules

These rules apply to every customer proposal below this directory.

- Treat all proposal content as confidential and access-controlled.
- Write every proposal for its prospective customer, not for the operator creating it. Conversation with the operator is requirement context only and must never be copied into customer-facing content unless the operator explicitly requests that exact wording.
- Keep customer-facing language warm, courteous, professional, and easy to understand. Avoid internal decision notes, implementation narration, argumentative comparisons, commands, and phrases such as "customer confirmed" or "final decision" unless they are intentionally required as contractual language.
- Every proposal route must validate its proposal session on the server before serving HTML, CSS, JavaScript, images, or other assets.
- Protected responses must use private, no-store caching and noindex headers.
- Every proposal page must load its `proposal-protection.css` and `proposal-protection.js` modules.
- Protection must block selection, copy, cut, context menus, image dragging, common save/print/source/developer shortcuts, printing, and print-to-PDF output.
- Printed output must never contain proposal content.
- Every proposal must show a session-linked trace watermark when session data is available, with a generic confidential watermark as fallback.
- Do not remove or weaken these controls during visual redesigns or content updates unless the user explicitly asks to change the protection policy.
- Before publishing, verify unauthenticated redirects, protected asset access, print suppression, keyboard protection, watermark rendering, desktop layout, and mobile layout.
