const form = document.querySelector('#access-form');
const input = document.querySelector('#access-code');
const errorNode = document.querySelector('#access-error');
const button = form.querySelector('button');
const idleButtonLabel = button.textContent.trim();

function clientContext() {
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

  return { deviceType, browserName, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '' };
}

const reason = new URLSearchParams(location.search).get('reason');
if (reason === 'expired') errorNode.textContent = '该提案的阅览期限已结束。如需再次开启，敬请联系您的项目顾问。';
if (reason === 'required') errorNode.textContent = '烦请先输入您的专属访问密钥。';

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  errorNode.textContent = '';
  button.disabled = true;
  button.textContent = '正在为您开启…';
  try {
    const response = await fetch('/api/proposal-access', {
      method: 'POST', credentials: 'same-origin',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ code: input.value.trim().toUpperCase(), client: clientContext() })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.message || '密钥似乎未能识别，烦请核对后再试。');
    location.replace(payload.redirect || '/');
  } catch (failure) {
    errorNode.textContent = failure.message || '暂时未能完成验证，请稍候再试，或联系您的项目顾问。';
    button.disabled = false;
    button.textContent = idleButtonLabel;
  }
});
