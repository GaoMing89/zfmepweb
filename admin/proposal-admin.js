(function () {
  const app = window.ZFMaintenance;
  const list = document.querySelector('[data-proposal-list]');
  const proposalModal = document.querySelector('[data-proposal-modal]');
  const keyModal = document.querySelector('[data-key-modal]');
  const permissionModal = document.querySelector('[data-permission-modal]');
  const proposalForm = document.querySelector('[data-proposal-form]');
  const keyForm = document.querySelector('[data-key-form]');
  const permissionForm = document.querySelector('[data-permission-form]');
  const accessUrl = `${location.origin}/proposal-access/`;
  let proposals = [];
  let keys = [];
  let activity = [];
  let filter = 'all';
  let freshCode = '';
  const expandedProposals = new Set();
  const activityFilters = new Map();

  const html = app.escapeHtml;
  function parseTime(value) {
    if (!value) return null;
    const normalized = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value)
      ? `${value.replace(' ', 'T')}Z`
      : value;
    const date = new Date(normalized);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  function formatTime(value) {
    const date = parseTime(value);
    if (!date) return '—';
    return new Intl.DateTimeFormat('zh-CN', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
  }
  function toLocalInput(value) {
    const date = parseTime(value) || new Date();
    const pad = (n) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }
  function formatDuration(seconds) {
    const total = Math.max(0, Number(seconds || 0));
    if (total < 60) return `${total} 秒`;
    const minutes = Math.floor(total / 60);
    const remainder = total % 60;
    if (minutes < 60) return remainder ? `${minutes} 分 ${remainder} 秒` : `${minutes} 分钟`;
    const hours = Math.floor(minutes / 60);
    const minuteRemainder = minutes % 60;
    return minuteRemainder ? `${hours} 小时 ${minuteRemainder} 分` : `${hours} 小时`;
  }
  function formatLocation(item) {
    const regions = {
      anhui: '安徽', beijing: '北京', chongqing: '重庆', fujian: '福建', gansu: '甘肃',
      guangdong: '广东', guangxi: '广西', guizhou: '贵州', hainan: '海南', hebei: '河北',
      heilongjiang: '黑龙江', henan: '河南', hubei: '湖北', hunan: '湖南', 'inner mongolia': '内蒙古',
      jiangsu: '江苏', jiangxi: '江西', jilin: '吉林', liaoning: '辽宁', ningxia: '宁夏',
      qinghai: '青海', shaanxi: '陕西', shandong: '山东', shanghai: '上海', shanxi: '山西',
      sichuan: '四川', tianjin: '天津', tibet: '西藏', xinjiang: '新疆', yunnan: '云南',
      zhejiang: '浙江', 'hong kong': '香港', macao: '澳门', taiwan: '台湾'
    };
    const cities = { changsha: '长沙', shenzhen: '深圳', guangzhou: '广州', foshan: '佛山', shanghai: '上海', beijing: '北京', hangzhou: '杭州', chengdu: '成都' };
    const rawRegion = String(item.region || '').trim();
    const regionKey = rawRegion.toLowerCase().replace(/\s+(sheng|province|shi)$/i, '');
    const region = regions[regionKey] || rawRegion;
    const city = String(item.city || '').trim();
    const cityLabel = cities[city.toLowerCase()] || city;
    const location = [region, city && city.toLowerCase() !== rawRegion.toLowerCase() ? cityLabel : ''].filter(Boolean).join(' · ');
    return location || item.country_code || '未知';
  }
  function formatDevice(item) {
    const devices = { mobile: '手机', tablet: '平板', desktop: '电脑' };
    return [devices[item.device_type] || '设备未知', item.browser_name || '浏览器未知'].join(' · ');
  }
  function stateOf(key) {
    if (key.status === 'revoked') return { label: '已撤销', cls: 'danger' };
    if (Date.parse(key.expires_at) <= Date.now()) return { label: '已到期', cls: 'warn' };
    if (key.max_views != null && Number(key.view_count) >= Number(key.max_views)) return { label: '次数用尽', cls: 'warn' };
    return { label: '有效', cls: '' };
  }
  function fail(nodeSelector, failure) {
    const node = document.querySelector(nodeSelector);
    node.textContent = failure.message || '操作失败，请稍后重试。';
    node.classList.add('show');
  }
  function clearError(nodeSelector) {
    const node = document.querySelector(nodeSelector);
    node.textContent = '';
    node.classList.remove('show');
  }

  async function loadAll() {
    const [proposalPayload, keyPayload, activityPayload] = await Promise.all([
      app.api('/api/admin/proposals'), app.api('/api/admin/proposal-keys'), app.api('/api/admin/proposal-activity')
    ]);
    proposals = proposalPayload.proposals || [];
    keys = keyPayload.keys || [];
    activity = activityPayload.activity || [];
    renderMetrics(); renderProposals();
  }

  function renderMetrics() {
    const customerRows = activity.filter((item) => !isInternalVisit(item));
    document.querySelector('[data-metric-total]').textContent = proposals.length;
    document.querySelector('[data-metric-active]').textContent = keys.filter((key) => stateOf(key).label === '有效').length;
    document.querySelector('[data-metric-views]').textContent = customerRows.length;
    const since = Date.now() - 7 * 86400000;
    document.querySelector('[data-metric-recent]').textContent = customerRows.filter((item) => (parseTime(item.last_seen_at)?.getTime() || 0) >= since).length;
  }

  function permissionRows(slug) {
    const rows = keys.filter((key) => key.slug === slug);
    if (!rows.length) return '<div class="empty-permission">尚未生成客户密钥</div>';
    return rows.map((key) => {
      const state = stateOf(key);
      return `<article class="permission-row"><div><strong>${html(key.customer_name)}</strong><span><code>${html(key.code_prefix)}••••</code> · ${formatTime(key.expires_at)}</span></div><div class="permission-usage"><strong>${Number(key.view_count || 0)} / ${Number(key.max_views || 0)}</strong><span>授权次数</span></div><span class="zf-chip ${state.cls}">${state.label}</span><button class="zf-btn small ghost" type="button" data-edit-key="${html(key.id)}">权限</button><button class="icon-action danger" type="button" data-delete-key="${html(key.id)}" aria-label="删除密钥">×</button></article>`;
    }).join('');
  }

  function proposalActivity(slug) {
    return activity.filter((item) => item.slug === slug);
  }

  function isInternalVisit(item) {
    return item.visitor_type === 'internal';
  }

  function customerActivity(slug) {
    return proposalActivity(slug).filter((item) => !isInternalVisit(item));
  }

  function salesInsight(rows) {
    if (!rows.length) return { level: '未查看', cls: 'idle', advice: '先确认客户是否收到入口与密钥，再约定一个明确的阅读时间。' };
    const totalSeconds = rows.reduce((sum, item) => sum + Number(item.active_seconds || 0), 0);
    const uniqueKeys = new Set(rows.map((item) => item.key_id || item.code_prefix).filter(Boolean)).size;
    const latestAt = Math.max(...rows.map((item) => parseTime(item.last_seen_at)?.getTime() || 0));
    const recentHours = latestAt ? (Date.now() - latestAt) / 3600000 : Infinity;
    const revisits = Math.max(0, rows.length - uniqueKeys);
    if (totalSeconds >= 180 && (revisits >= 1 || rows.length >= 2)) {
      return { level: '重点跟进', cls: 'hot', advice: recentHours <= 72 ? '客户有重复或深度阅读信号，建议 24 小时内联系，直接确认重点、疑问和决策节奏。' : '客户曾深度阅读但最近未回访，建议用方案更新点重新激活沟通。' };
    }
    if (totalSeconds >= 60 || rows.length >= 2) {
      return { level: '持续关注', cls: 'warm', advice: '建议 1—2 天内跟进，询问最关注的系统、预算边界和下一位共同决策人。' };
    }
    return { level: '初步打开', cls: 'new', advice: '客户已打开但有效阅读较短，建议先发送三条核心结论，再约一次简短讲解。' };
  }

  function activityPanel(item) {
    const allRows = proposalActivity(item.slug);
    const customerRows = allRows.filter((row) => !isInternalVisit(row));
    const internalRows = allRows.filter(isInternalVisit);
    const activityFilter = activityFilters.get(item.id) || 'customer';
    const rows = activityFilter === 'all' ? allRows : activityFilter === 'internal' ? internalRows : customerRows;
    const insight = salesInsight(customerRows);
    const totalSeconds = customerRows.reduce((sum, row) => sum + Number(row.active_seconds || 0), 0);
    const uniqueNetworks = new Set(customerRows.map((row) => row.ip_prefix).filter(Boolean)).size;
    const qualified = customerRows.filter((row) => Number(row.active_seconds || 0) >= 60).length;
    const latest = customerRows.reduce((current, row) => {
      if (!current) return row;
      return (parseTime(row.last_seen_at)?.getTime() || 0) > (parseTime(current.last_seen_at)?.getTime() || 0) ? row : current;
    }, null);
    const visits = rows.map((row) => {
      const internal = isInternalVisit(row);
      const visitorName = internal ? '我自己' : (row.customer_name || '未命名');
      const visitorDetail = internal
        ? `内部访问${row.internal_display_name || row.internal_account ? ` · ${html(row.internal_display_name || row.internal_account)}` : ''}`
        : `<code>${html(row.code_prefix || '—')}••••</code>`;
      return `<article class="proposal-visit-row ${internal ? 'internal' : ''}">
      <div><span>首次访问</span><strong>${formatTime(row.created_at)}</strong></div>
      <div><span>访问人 / 身份</span><strong>${html(visitorName)}${internal ? '<b class="internal-visit-badge">内部</b>' : ''}</strong><small>${visitorDetail}</small></div>
      <div><span>地区 / IP 网段</span><strong>${html(formatLocation(row))}</strong><small><code>${html(row.ip_prefix || '—')}</code></small></div>
      <div><span>设备</span><strong>${html(formatDevice(row))}</strong></div>
      <div><span>有效浏览</span><strong>${html(formatDuration(row.active_seconds))}</strong></div>
      <div><span>最近活跃</span><strong>${formatTime(row.last_seen_at)}</strong><button class="visit-classify" type="button" data-classify-visit="${html(row.id)}" data-visitor-type="${internal ? 'customer' : 'internal'}">${internal ? '改为客户访问' : '标记为我自己'}</button></div>
    </article>`;
    }).join('') || `<div class="proposal-analysis-empty">${activityFilter === 'internal' ? '还没有内部访问记录。' : '还没有客户访问记录。'}</div>`;
    return `<section class="proposal-analysis" data-analysis-panel="${html(item.id)}">
      <header class="proposal-analysis-head"><div><span>销售跟进信号</span><strong class="sales-signal ${insight.cls}">${insight.level}</strong></div><p>${html(insight.advice)}</p></header>
      <div class="proposal-analysis-metrics">
        <div><span>客户访问</span><strong>${customerRows.length}</strong></div>
        <div><span>有效阅读 ≥ 1分钟</span><strong>${qualified}</strong></div>
        <div><span>累计有效浏览</span><strong>${html(formatDuration(totalSeconds))}</strong></div>
        <div><span>访问网络数</span><strong>${uniqueNetworks}</strong></div>
        <div><span>最近活跃</span><strong>${formatTime(latest?.last_seen_at)}</strong></div>
      </div>
      <div class="activity-filter" role="group" aria-label="访问记录筛选">
        <button class="${activityFilter === 'customer' ? 'active' : ''}" type="button" data-activity-filter="customer" data-proposal-id="${html(item.id)}">客户访问 · ${customerRows.length}</button>
        <button class="${activityFilter === 'internal' ? 'active' : ''}" type="button" data-activity-filter="internal" data-proposal-id="${html(item.id)}">内部访问 · ${internalRows.length}</button>
        <button class="${activityFilter === 'all' ? 'active' : ''}" type="button" data-activity-filter="all" data-proposal-id="${html(item.id)}">全部 · ${allRows.length}</button>
      </div>
      <p class="proposal-analysis-note">销售判断仅统计客户访问；已登录管理员的查看会自动识别为内部访问。IP 只显示约略地区，不能单独作为身份依据。</p>
      <div class="proposal-visit-list">${visits}</div>
    </section>`;
  }

  function renderProposals() {
    const query = document.querySelector('[data-search]').value.trim().toLowerCase();
    const shown = proposals.filter((item) => (filter === 'all' || item.status === filter) && (!query || `${item.title} ${item.customer_name || ''} ${item.slug}`.toLowerCase().includes(query)));
    list.innerHTML = shown.map((item) => {
      const rows = customerActivity(item.slug);
      const latestCustomer = rows.reduce((current, row) => {
        if (!current) return row;
        return (parseTime(row.last_seen_at)?.getTime() || 0) > (parseTime(current.last_seen_at)?.getTime() || 0) ? row : current;
      }, null);
      const expanded = expandedProposals.has(item.id);
      return `<article class="proposal-card ${item.status === 'disabled' ? 'disabled' : ''}">
      <header><div><p>${html(item.customer_name || '未填写客户')}</p><h2>${html(item.title)}</h2><span class="proposal-slug">${html(item.slug)}</span></div><span class="zf-chip ${item.status === 'disabled' ? 'warn' : ''}">${item.status === 'active' ? '开放中' : '已停用'}</span></header>
      <div class="proposal-card-metrics"><div><span>有效授权</span><strong>${Number(item.active_key_count || 0)}</strong></div><div><span>客户访问</span><strong>${rows.length}</strong></div><div><span>最近客户访问</span><strong class="time-value">${formatTime(latestCustomer?.last_seen_at)}</strong></div></div>
      <div class="proposal-actions"><button class="zf-btn small ghost" type="button" data-preview-proposal="${html(item.id)}">预览</button><button class="zf-btn small ghost" type="button" data-edit-proposal="${html(item.id)}">编辑</button><button class="zf-btn small primary" type="button" data-new-key="${html(item.id)}">生成密钥</button><button class="zf-btn small analysis-toggle ${expanded ? 'active' : ''}" type="button" data-toggle-analysis="${html(item.id)}" aria-expanded="${expanded}">${expanded ? '收起分析' : `访问分析 · ${rows.length}`}</button><button class="icon-action danger" type="button" data-delete-proposal="${html(item.id)}" aria-label="删除提案">删除</button></div>
      <div class="permission-list"><h3>访问权限</h3>${permissionRows(item.slug)}</div>
      ${expanded ? activityPanel(item) : ''}
    </article>`;
    }).join('') || '<div class="proposal-empty">没有符合条件的提案。</div>';
  }

  function openProposal(item = null) {
    proposalForm.reset(); clearError('[data-proposal-error]');
    proposalForm.elements.id.value = item?.id || '';
    proposalForm.elements.title.value = item?.title || '';
    proposalForm.elements.customerName.value = item?.customer_name || '';
    proposalForm.elements.slug.value = item?.slug || '';
    proposalForm.elements.slug.disabled = Boolean(item);
    proposalForm.elements.contentPath.value = item?.content_path || '';
    proposalForm.elements.description.value = item?.description || '';
    proposalForm.elements.status.value = item?.status || 'active';
    document.querySelector('[data-status-field]').hidden = !item;
    document.querySelector('[data-proposal-modal-title]').textContent = item ? '编辑提案' : '新建提案';
    proposalModal.classList.add('open');
  }
  function openKey(item) {
    keyForm.reset(); clearError('[data-key-error]');
    keyForm.elements.proposal.value = item.slug;
    keyForm.elements.proposalTitle.value = item.title;
    keyForm.elements.customerName.value = item.customer_name || '';
    document.querySelector('[data-key-result]').hidden = true;
    keyModal.classList.add('open');
  }
  function openPermission(key) {
    permissionForm.reset(); clearError('[data-permission-error]');
    permissionForm.elements.id.value = key.id;
    permissionForm.elements.customerName.value = key.customer_name;
    permissionForm.elements.expiresAt.value = toLocalInput(key.expires_at);
    permissionForm.elements.maxViews.value = key.max_views;
    permissionForm.elements.status.value = key.status;
    permissionModal.classList.add('open');
  }

  async function removeProposal(id) {
    const item = proposals.find((entry) => entry.id === id);
    if (!item || !confirm(`确定删除“${item.title}”？\n它的密钥与查看记录也会一并删除，但网页文件不会被删除。`)) return;
    await app.api(`/api/admin/proposals?id=${encodeURIComponent(id)}`, { method: 'DELETE' }); await loadAll();
  }
  async function removeKey(id) {
    if (!confirm('确定删除这个密钥及它的查看记录？')) return;
    await app.api(`/api/admin/proposal-keys?id=${encodeURIComponent(id)}`, { method: 'DELETE' }); await loadAll();
  }

  list.addEventListener('click', async (event) => {
    try {
      const activityFilterButton = event.target.closest('[data-activity-filter]');
      if (activityFilterButton) {
        activityFilters.set(activityFilterButton.dataset.proposalId, activityFilterButton.dataset.activityFilter);
        renderProposals();
        return;
      }
      const classifyVisit = event.target.closest('[data-classify-visit]');
      if (classifyVisit) {
        await app.api('/api/admin/proposal-activity', { method: 'PATCH', body: JSON.stringify({ id: classifyVisit.dataset.classifyVisit, visitorType: classifyVisit.dataset.visitorType }) });
        await loadAll();
        return;
      }
      const editProposal = event.target.closest('[data-edit-proposal]'); if (editProposal) return openProposal(proposals.find((x) => x.id === editProposal.dataset.editProposal));
      const previewProposal = event.target.closest('[data-preview-proposal]'); if (previewProposal) return openKey(proposals.find((x) => x.id === previewProposal.dataset.previewProposal));
      const newKey = event.target.closest('[data-new-key]'); if (newKey) return openKey(proposals.find((x) => x.id === newKey.dataset.newKey));
      const toggleAnalysis = event.target.closest('[data-toggle-analysis]');
      if (toggleAnalysis) {
        const id = toggleAnalysis.dataset.toggleAnalysis;
        if (expandedProposals.has(id)) expandedProposals.delete(id); else expandedProposals.add(id);
        renderProposals();
        if (expandedProposals.has(id)) document.querySelector(`[data-analysis-panel="${CSS.escape(id)}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        return;
      }
      const editKey = event.target.closest('[data-edit-key]'); if (editKey) return openPermission(keys.find((x) => x.id === editKey.dataset.editKey));
      const deleteProposal = event.target.closest('[data-delete-proposal]'); if (deleteProposal) return await removeProposal(deleteProposal.dataset.deleteProposal);
      const deleteKey = event.target.closest('[data-delete-key]'); if (deleteKey) return await removeKey(deleteKey.dataset.deleteKey);
    } catch (failure) { fail('[data-page-error]', failure); }
  });

  proposalForm.addEventListener('submit', async (event) => {
    event.preventDefault(); clearError('[data-proposal-error]');
    const fd = new FormData(proposalForm); const id = String(fd.get('id') || '');
    const body = { id, title: fd.get('title'), customerName: fd.get('customerName'), slug: proposalForm.elements.slug.value, contentPath: fd.get('contentPath'), description: fd.get('description'), status: fd.get('status') };
    try { await app.api('/api/admin/proposals', { method: id ? 'PATCH' : 'POST', body: JSON.stringify(body) }); proposalModal.classList.remove('open'); await loadAll(); }
    catch (failure) { fail('[data-proposal-error]', failure); }
  });

  keyForm.addEventListener('submit', async (event) => {
    event.preventDefault(); clearError('[data-key-error]');
    const fd = new FormData(keyForm);
    try {
      const payload = await app.api('/api/admin/proposal-keys', { method: 'POST', body: JSON.stringify({ proposal: fd.get('proposal'), customerName: fd.get('customerName'), validDays: fd.get('validDays'), maxViews: fd.get('maxViews') }) });
      freshCode = payload.key.code; document.querySelector('[data-new-code]').textContent = freshCode;
      document.querySelector('[data-new-expiry]').textContent = `有效至 ${formatTime(payload.key.expiresAt)}，允许 ${payload.key.maxViews} 次授权。`;
      document.querySelector('[data-key-result]').hidden = false; await loadAll();
    } catch (failure) { fail('[data-key-error]', failure); }
  });

  permissionForm.addEventListener('submit', async (event) => {
    event.preventDefault(); clearError('[data-permission-error]'); const fd = new FormData(permissionForm);
    try { await app.api('/api/admin/proposal-keys', { method: 'PATCH', body: JSON.stringify({ action: 'edit', id: fd.get('id'), customerName: fd.get('customerName'), expiresAt: new Date(fd.get('expiresAt')).toISOString(), maxViews: fd.get('maxViews'), status: fd.get('status') }) }); permissionModal.classList.remove('open'); await loadAll(); }
    catch (failure) { fail('[data-permission-error]', failure); }
  });

  document.querySelector('[data-new-proposal]').addEventListener('click', () => openProposal());
  document.querySelector('[data-close-proposal]').addEventListener('click', () => proposalModal.classList.remove('open'));
  document.querySelector('[data-close-key]').addEventListener('click', () => keyModal.classList.remove('open'));
  document.querySelector('[data-close-permission]').addEventListener('click', () => permissionModal.classList.remove('open'));
  document.querySelector('[data-copy-package]').addEventListener('click', async (event) => { await navigator.clipboard.writeText(`泽丰专属提案入口：${accessUrl}\n访问密钥：${freshCode}\n密钥具有有效期，请勿转发。`); event.currentTarget.textContent = '已复制'; });
  document.querySelector('[data-search]').addEventListener('input', renderProposals);
  document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => { filter = button.dataset.filter; document.querySelectorAll('[data-filter]').forEach((x) => x.classList.toggle('active', x === button)); renderProposals(); }));
  (async () => { if (!await app.guard('admin')) return; try { await loadAll(); } catch (failure) { fail('[data-page-error]', failure); } })();
})();
