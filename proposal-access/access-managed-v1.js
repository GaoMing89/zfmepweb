const form = document.querySelector('#access-form');
const input = document.querySelector('#access-code');
const errorNode = document.querySelector('#access-error');
const button = form.querySelector('button');

const reason = new URLSearchParams(location.search).get('reason');
if (reason === 'expired') errorNode.textContent = '该提案访问期已结束，请联系泽丰项目顾问。';
if (reason === 'required') errorNode.textContent = '请输入访问密钥后查看专属提案。';

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  errorNode.textContent = '';
  button.disabled = true;
  button.textContent = '正在进入提案…';
  try {
    const response = await fetch('/api/proposal-access', {
      method: 'POST', credentials: 'same-origin',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ code: input.value.trim().toUpperCase() })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.message || '访问密钥不正确，请核对后重试。');
    location.replace(payload.redirect || '/');
  } catch (failure) {
    errorNode.textContent = failure.message || '暂时无法验证，请稍后重试。';
    button.disabled = false;
    button.textContent = '验证并查看提案';
  }
});
