(function () {
  const script = document.currentScript;
  const proposal = script?.dataset.proposal || 'jiangshanjing-fresh-air';
  const watermark = document.createElement('div');
  const shield = document.createElement('div');
  let shieldTimer = 0;

  document.body.classList.add('protected-content');
  document.querySelectorAll('img').forEach((image) => { image.draggable = false; });

  watermark.className = 'proposal-watermark';
  watermark.setAttribute('aria-hidden', 'true');
  document.body.append(watermark);

  shield.className = 'capture-shield';
  shield.setAttribute('aria-hidden', 'true');
  shield.textContent = '专属提案受保护，请返回页面继续查看';
  document.body.append(shield);

  function renderWatermark(label) {
    watermark.replaceChildren(...Array.from({ length: 9 }, () => {
      const item = document.createElement('span');
      item.textContent = label;
      return item;
    }));
  }

  function hideShield() {
    clearTimeout(shieldTimer);
    shield.classList.remove('is-active');
  }

  function showShield(duration = 0) {
    clearTimeout(shieldTimer);
    shield.classList.add('is-active');
    if (duration > 0) shieldTimer = setTimeout(hideShield, duration);
  }

  function block(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  renderWatermark('专属提案 · 禁止外传');
  fetch(`/api/proposal-session?proposal=${encodeURIComponent(proposal)}`, {
    credentials: 'same-origin',
    headers: { Accept: 'application/json' }
  })
    .then((response) => response.ok ? response.json() : null)
    .then((session) => {
      if (!session) return;
      const owner = String(session.customerName || '').trim();
      const trace = String(session.traceCode || '').trim();
      const label = [owner ? `仅限 ${owner}` : '专属提案', trace ? `访问编号 ${trace}` : '禁止外传'].join(' · ');
      renderWatermark(label);
    })
    .catch(() => {});

  ['contextmenu', 'copy', 'cut', 'dragstart'].forEach((type) => {
    document.addEventListener(type, block, { capture: true });
  });

  document.addEventListener('keydown', (event) => {
    const key = String(event.key || '').toLowerCase();
    const command = event.metaKey || event.ctrlKey;
    const captureShortcut = key === 'printscreen' || (event.metaKey && event.shiftKey && ['3', '4', '5'].includes(key));
    const developerShortcut = key === 'f12' || (command && event.shiftKey && ['i', 'j', 'c'].includes(key));
    const documentShortcut = command && ['p', 's', 'u', 'c', 'x'].includes(key);
    if (!captureShortcut && !developerShortcut && !documentShortcut) return;
    block(event);
    if (captureShortcut) showShield(1400);
  }, { capture: true });

  addEventListener('blur', () => showShield());
  addEventListener('focus', () => setTimeout(hideShield, 160));
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) showShield();
    else setTimeout(hideShield, 160);
  });
})();
