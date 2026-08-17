(function () {
  const script = document.currentScript;
  const proposal = script?.dataset.proposal || location.pathname.split('/').filter(Boolean)[1] || '';
  if (!/^[a-z0-9-]+$/.test(proposal)) return;

  let activeStartedAt = document.visibilityState === 'visible' ? performance.now() : null;
  let sending = false;

  async function flush(keepalive = false) {
    if (activeStartedAt == null || sending) return;
    const now = performance.now();
    const activeSeconds = Math.min(60, Math.max(0, Math.round((now - activeStartedAt) / 1000)));
    activeStartedAt = now;
    if (activeSeconds < 1) return;

    sending = true;
    try {
      await fetch('/api/proposal-heartbeat', {
        method: 'POST',
        credentials: 'same-origin',
        cache: 'no-store',
        keepalive,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ proposal, activeSeconds })
      });
    } catch (_) {
      // Browsing analytics must never interrupt the proposal itself.
    } finally {
      sending = false;
    }
  }

  const timer = setInterval(() => {
    if (document.visibilityState === 'visible') void flush(false);
  }, 30000);

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      void flush(true);
      activeStartedAt = null;
    } else {
      activeStartedAt = performance.now();
    }
  });

  window.addEventListener('pagehide', () => {
    clearInterval(timer);
    void flush(true);
  }, { once: true });
})();
