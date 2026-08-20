(function () {
  const script = document.currentScript;
  const proposal = script?.dataset.proposal || location.pathname.split('/').filter(Boolean)[1] || '';
  if (!/^[a-z0-9-]+$/.test(proposal)) return;

  const userAgent = navigator.userAgent || '';
  let deviceType = 'desktop';
  if (/ipad|tablet|playbook|silk/i.test(userAgent)) deviceType = 'tablet';
  else if (/mobile|iphone|ipod|android/i.test(userAgent)) deviceType = 'mobile';
  let browserName = '其他浏览器';
  if (/MicroMessenger/i.test(userAgent)) browserName = '微信';
  else if (/Edg\//i.test(userAgent)) browserName = 'Edge';
  else if (/Firefox|FxiOS/i.test(userAgent)) browserName = 'Firefox';
  else if (/Chrome|CriOS/i.test(userAgent)) browserName = 'Chrome';
  else if (/Safari/i.test(userAgent)) browserName = 'Safari';
  const client = { deviceType, browserName, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '' };

  let activeStartedAt = document.visibilityState === 'visible' ? performance.now() : null;
  let pendingSeconds = 0;
  let sending = false;

  function collectActiveSeconds() {
    if (activeStartedAt == null) return;
    const now = performance.now();
    pendingSeconds += Math.max(0, Math.floor((now - activeStartedAt) / 1000));
    activeStartedAt = now;
  }

  async function flush(keepalive = false, includeContextOnly = false) {
    collectActiveSeconds();
    if (sending || (pendingSeconds < 1 && !includeContextOnly)) return;
    const activeSeconds = Math.min(60, pendingSeconds);
    const body = JSON.stringify({ proposal, activeSeconds, client });

    if (keepalive && activeSeconds > 0 && navigator.sendBeacon) {
      const accepted = navigator.sendBeacon('/api/proposal-heartbeat', new Blob([body], { type: 'application/json' }));
      if (accepted) {
        pendingSeconds -= activeSeconds;
        return;
      }
    }

    sending = true;
    try {
      const response = await fetch('/api/proposal-heartbeat', {
        method: 'POST',
        credentials: 'same-origin',
        cache: 'no-store',
        keepalive,
        headers: { 'content-type': 'application/json' },
        body
      });
      if (response.ok) pendingSeconds -= activeSeconds;
    } catch (_) {
      // Browsing analytics must never interrupt the proposal itself.
    } finally {
      sending = false;
    }
  }

  void flush(false, true);
  const earlyTimer = setTimeout(() => void flush(false), 5000);
  const timer = setInterval(() => {
    if (document.visibilityState === 'visible') void flush(false);
  }, 10000);

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      collectActiveSeconds();
      void flush(true);
      activeStartedAt = null;
    } else {
      activeStartedAt = performance.now();
    }
  });

  window.addEventListener('pagehide', () => {
    clearTimeout(earlyTimer);
    clearInterval(timer);
    void flush(true);
  }, { once: true });
})();
