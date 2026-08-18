(function () {
  const requestedDemo = new URLSearchParams(location.search).get("demo") === "1";
  const localHost = location.hostname === "localhost" || location.hostname === "127.0.0.1";
  if (requestedDemo && localHost) sessionStorage.setItem("zf-demo-enabled", "1");
  const IS_DEMO = location.protocol === "file:" || sessionStorage.getItem("zf-demo-enabled") === "1";
  const DEMO_USERS = {
    "ZF-2026-0018": { password: "Zefeng2026", role: "customer", name: "王先生", home: "青竹湖住宅" },
    "zefeng-admin": { password: "Admin2026", role: "admin", name: "泽丰管理员" }
  };
  const baseData = {
    customers: [
      { id: "user-18", account: "ZF-2026-0018", display_name: "王先生", home_id: "home-18", home_name: "青竹湖住宅", device_count: 12, status: "active" },
      { id: "user-21", account: "ZF-2026-0021", display_name: "陈女士", home_id: "home-21", home_name: "梅溪湖住宅", device_count: 9, status: "active" },
      { id: "user-27", account: "ZF-2026-0027", display_name: "周先生", home_id: "home-27", home_name: "岳麓山别墅", device_count: 16, status: "attention" }
    ],
    devices: [
      { id: "dev-air-1", internal_code: "ZF-AIR-018-01", device_type: "全热交换新风机", brand: "Panasonic", model: "FY-E35PMA", serial_number: "PNE35-24091876", location: "负一层设备间", status: "正常运行" },
      { id: "dev-water-1", internal_code: "ZF-WAT-018-01", device_type: "RO反渗透净水器", brand: "3M", model: "SW50", serial_number: "3MSW50-882016", location: "厨房水槽下方", status: "正常运行" },
      { id: "dev-drain-1", internal_code: "ZF-DRN-018-01", device_type: "双泵污水提升器", brand: "Wilo", model: "DrainLift SANI-L", serial_number: "WLSL-2024-0917", location: "负一层设备间", status: "建议巡检" },
      { id: "dev-hvac-1", internal_code: "ZF-HVC-018-01", device_type: "空气源热泵主机", brand: "Daikin", model: "EWYT-CZ", serial_number: "DKCZ-081107", location: "北侧设备平台", status: "正常运行" }
    ],
    components: [
      { device_id: "dev-air-1", name: "初效滤网", specification: "G4 / 420×260×20 mm", barcode: "ZF-FLT-G4-420260", quantity: 2, last_serviced_on: "2026-05-08", next_due_on: "2026-08-08", status: "即将到期" },
      { device_id: "dev-air-1", name: "中效滤网", specification: "F7 / 420×260×45 mm", barcode: "ZF-FLT-F7-420260", quantity: 2, last_serviced_on: "2026-02-08", next_due_on: "2026-08-08", status: "即将到期" },
      { device_id: "dev-air-1", name: "高效滤网", specification: "H13 / 420×260×65 mm", barcode: "ZF-FLT-H13-420260", quantity: 1, last_serviced_on: "2025-11-08", next_due_on: "2026-11-08", status: "正常" },
      { device_id: "dev-water-1", name: "PP棉滤芯", specification: "第1级 / 5 μm", barcode: "3M-SW50-PP5", quantity: 1, last_serviced_on: "2026-04-18", next_due_on: "2026-07-18", status: "已逾期" },
      { device_id: "dev-water-1", name: "前置活性炭", specification: "第2级 / CTO", barcode: "3M-SW50-CTO", quantity: 1, last_serviced_on: "2026-01-18", next_due_on: "2026-07-18", status: "已逾期" },
      { device_id: "dev-water-1", name: "RO膜", specification: "第3级 / 500 GPD", barcode: "3M-SW50-RO500", quantity: 1, last_serviced_on: "2025-01-18", next_due_on: "2027-01-18", status: "正常" }
    ],
    tasks: [
      { title: "RO净水器 · PP棉与前置活性炭", detail: "厨房水槽下方 · 两支滤芯已超过建议更换日期", due: "逾期 2 天", risk_level: "safety" },
      { title: "污水提升系统 · 季度巡检", detail: "负一层设备间 · 主备泵切换、高液位报警与止回阀测试", due: "还有 6 天", risk_level: "overflow" },
      { title: "新风系统 · 风口清洁", detail: "全屋 11 个送风口、5 个回风口，包含拆洗与风量复核", due: "还有 18 天", risk_level: "routine" }
    ],
    recentServices: [
      { title: "新风初效滤网清洁", completed_at: "2026-05-08", status: "完成2块滤网清洁及设备运行检查" },
      { title: "地暖采暖季后检查", completed_at: "2026-04-12", status: "完成分集水器、压力及各环路流量检查" }
    ]
  };

  const demoStore = {
    get() {
      try { return JSON.parse(localStorage.getItem("zf-maintenance-data")) || structuredClone(baseData); }
      catch (_) { return structuredClone(baseData); }
    },
    set(data) { localStorage.setItem("zf-maintenance-data", JSON.stringify(data)); }
  };
  if (IS_DEMO && !localStorage.getItem("zf-maintenance-data")) demoStore.set(structuredClone(baseData));

  let sessionCache = null;
  async function api(path, options = {}) {
    const headers = new Headers(options.headers || {});
    if (options.body && !headers.has("content-type")) headers.set("content-type", "application/json");
    const csrf = sessionStorage.getItem("zf-csrf");
    if (csrf && options.method && options.method !== "GET") headers.set("x-zf-csrf", csrf);
    const response = await fetch(path, { ...options, headers, credentials: "same-origin" });
    const payload = await response.json().catch(() => ({ ok: false, message: "服务器返回了无法识别的数据。" }));
    if (!response.ok) {
      const failure = new Error(payload.message || "请求失败。");
      failure.status = response.status;
      failure.code = payload.error;
      throw failure;
    }
    if (payload.csrf) sessionStorage.setItem("zf-csrf", payload.csrf);
    return payload;
  }

  function demoSession() {
    try { return JSON.parse(sessionStorage.getItem("zf-demo-session")); }
    catch (_) { return null; }
  }

  async function currentSession() {
    if (IS_DEMO) return demoSession();
    if (sessionCache) return sessionCache;
    try {
      const payload = await api("/api/session");
      sessionCache = { ...payload.user, homes: payload.homes };
      return sessionCache;
    } catch (_) { return null; }
  }

  async function guard(role) {
    const current = await currentSession();
    if (!current || (role && current.role !== role)) {
      const adminTarget = document.body.matches("[data-proposal-admin]") ? "proposals" : "admin";
      location.href = role === "admin"
        ? `../login/index.html?next=${adminTarget}`
        : "../login/index.html";
      return null;
    }
    document.querySelectorAll("[data-user-name]").forEach((node) => { node.textContent = current.name; });
    const primaryHome = current.homes?.[0]?.name || current.home;
    if (primaryHome) document.querySelectorAll("[data-home-name]").forEach((node) => { node.textContent = primaryHome; });
    return current;
  }

  function bindLogin() {
    const form = document.querySelector("[data-login-form]");
    if (!form) return;
    const requestedTarget = new URLSearchParams(location.search).get("next");
    if (requestedTarget === "proposals" || requestedTarget === "admin") {
      const title = document.querySelector(".zf-login-box h2");
      const lead = document.querySelector(".zf-login-box h2 + p");
      const accountLabel = document.querySelector('label[for="account"]');
      if (title) title.textContent = requestedTarget === "proposals" ? "进入提案管理中心" : "进入泽丰管理中心";
      if (lead) lead.textContent = "使用泽丰管理员账号与密码登录。";
      if (accountLabel) accountLabel.textContent = "管理员账号";
    }
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const button = form.querySelector('button[type="submit"]');
      const errorNode = document.querySelector("[data-login-error]");
      errorNode.classList.remove("show");
      button.disabled = true;
      button.textContent = "正在验证…";
      const fd = new FormData(form);
      const account = String(fd.get("account") || "").trim();
      const password = String(fd.get("password") || "");
      try {
        let user;
        if (IS_DEMO) {
          const demoUser = DEMO_USERS[account];
          if (!demoUser || demoUser.password !== password) throw new Error("账号或密码不正确，请重新输入。");
          user = { account, ...demoUser };
          sessionStorage.setItem("zf-demo-session", JSON.stringify(user));
        } else {
          const payload = await api("/api/login", { method: "POST", body: JSON.stringify({ account, password }) });
          user = payload.user;
          sessionCache = user;
        }
        location.href = user.role === "admin"
          ? (requestedTarget === "proposals" ? "../admin/proposals.html" : "../admin/index.html")
          : "../maintenance/index.html";
      } catch (failure) {
        errorNode.textContent = failure.message || "暂时无法登录，请稍后重试。";
        errorNode.classList.add("show");
        button.disabled = false;
        button.textContent = "安全登录";
      }
    });
  }

  function bindLogout() {
    document.querySelectorAll("[data-logout]").forEach((button) => button.addEventListener("click", async () => {
      button.disabled = true;
      try {
        if (IS_DEMO) sessionStorage.removeItem("zf-demo-session");
        else await api("/api/logout", { method: "POST" });
      } catch (_) {}
      sessionStorage.removeItem("zf-csrf");
      location.href = "../login/index.html";
    }));
  }

  function chipClass(status) {
    return status === "已逾期" || status === "safety" ? "danger" : status === "即将到期" || status === "overflow" ? "warn" : "";
  }

  async function renderCustomer() {
    if (!document.querySelector("[data-customer-page]")) return;
    if (!await guard("customer")) return;
    let data;
    try {
      data = IS_DEMO
        ? { ...demoStore.get(), home: { name: "青竹湖住宅" }, summary: { devices: 12, due: 3, completed: 18 } }
        : await api("/api/dashboard");
    } catch (failure) {
      document.querySelector("[data-page-error]").textContent = failure.message;
      document.querySelector("[data-page-error]").classList.add("show");
      return;
    }
    document.querySelectorAll("[data-home-name]").forEach((node) => { node.textContent = data.home?.name || "住宅"; });
    const deviceList = document.querySelector("[data-device-list]");
    deviceList.innerHTML = (data.devices || []).map((device) => `
      <article class="zf-device">
        <div class="zf-device-top">
          <div><strong>${escapeHtml(device.device_type)}</strong><p>${escapeHtml(device.brand || "未录入品牌")} · ${escapeHtml(device.model || "未录入型号")}<br>${escapeHtml(device.location || "未录入位置")}</p></div>
          <span class="zf-chip ${chipClass(device.status)}">${escapeHtml(device.status || "正常运行")}</span>
        </div>
        <div class="zf-device-code">设备编号 ${escapeHtml(device.internal_code)}<br>序列号 ${escapeHtml(device.serial_number || "未录入")}</div>
      </article>`).join("");
    document.querySelector("[data-component-body]").innerHTML = (data.components || []).map((item) => `
      <tr>
        <td><strong>${escapeHtml(item.name)}</strong><br><small>${escapeHtml(item.specification || "未录入规格")}</small></td>
        <td>${escapeHtml(item.barcode || "—")}</td><td>${Number(item.quantity || 1)}</td>
        <td>${escapeHtml(item.last_serviced_on || "—")}</td><td>${escapeHtml(item.next_due_on || "待建立")}</td>
        <td><span class="zf-chip ${chipClass(item.status)}">${escapeHtml(item.status || "正常")}</span></td>
      </tr>`).join("");
    const taskList = document.querySelector("[data-task-list]");
    if (taskList) taskList.innerHTML = (data.tasks || []).map((task) => `
      <article class="zf-task"><span class="zf-task-mark ${chipClass(task.risk_level)}"></span>
        <div><strong>${escapeHtml(task.title)}</strong><p>${escapeHtml(task.detail || [task.device_type, task.location].filter(Boolean).join(" · "))}</p></div>
        <time>${escapeHtml(task.due || task.due_on || "待安排")}</time></article>`).join("");
    const recent = document.querySelector("[data-recent-services]");
    if (recent) recent.innerHTML = (data.recentServices || []).map((item) => `
      <article class="zf-device"><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.completed_at || "")}<br>${escapeHtml(item.status || "已完成")}</p></article>`).join("");
  }

  async function renderAdmin() {
    if (!document.querySelector("[data-admin-page]")) return;
    if (!await guard("admin")) return;
    const body = document.querySelector("[data-customer-body]");
    let customers;
    try { customers = IS_DEMO ? demoStore.get().customers : (await api("/api/admin/customers")).customers; }
    catch (failure) {
      document.querySelector("[data-page-error]").textContent = failure.message;
      document.querySelector("[data-page-error]").classList.add("show");
      return;
    }
    body.innerHTML = customers.map((customer) => `
      <tr>
        <td><strong>${escapeHtml(customer.display_name)}</strong><br><small>${escapeHtml(customer.account)}</small></td>
        <td>${escapeHtml(customer.home_name || "尚未建立住宅")}</td>
        <td>—</td><td>${Number(customer.device_count || 0)}</td>
        <td><span class="zf-chip ${customer.status === "attention" ? "warn" : ""}">${customer.status === "attention" ? "需要关注" : "服务中"}</span></td>
        <td><a class="zf-btn small ghost" href="device.html?home=${encodeURIComponent(customer.home_id || "")}">录入设备</a></td>
      </tr>`).join("");
    bindCustomerModal();
  }

  function bindCustomerModal() {
    const modal = document.querySelector("[data-modal]");
    document.querySelector("[data-open-modal]")?.addEventListener("click", () => modal.classList.add("open"));
    document.querySelectorAll("[data-close-modal]").forEach((el) => el.addEventListener("click", () => modal.classList.remove("open")));
    document.querySelector("[data-customer-form]")?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const fd = new FormData(form);
      const payload = {
        account: String(fd.get("id")), displayName: String(fd.get("name")),
        homeName: String(fd.get("home")), initialPassword: String(fd.get("password"))
      };
      try {
        if (IS_DEMO) {
          const data = demoStore.get();
          data.customers.unshift({ id: crypto.randomUUID(), account: payload.account, display_name: payload.displayName, home_id: crypto.randomUUID(), home_name: payload.homeName, device_count: 0, status: "active" });
          demoStore.set(data);
        } else {
          await api("/api/admin/customers", { method: "POST", body: JSON.stringify(payload) });
        }
        modal.classList.remove("open");
        location.reload();
      } catch (failure) {
        const node = form.querySelector("[data-form-error]");
        node.textContent = failure.message;
        node.classList.add("show");
      }
    });
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }

  async function init() {
    bindLogin();
    bindLogout();
    await renderCustomer();
    await renderAdmin();
    if (document.querySelector("[data-device-entry]")) await guard("admin");
  }
  window.ZFMaintenance = { api, guard, currentSession, demoStore, isDemo: IS_DEMO, escapeHtml };
  init();
})();
