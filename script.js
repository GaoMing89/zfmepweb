const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const tagList = (items) => items.map((item) => `<span>${item}</span>`).join("");

const metricIcons = {
  temperature: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 14.8V5a4 4 0 0 0-8 0v9.8a6 6 0 1 0 8 0Z"/><path d="M10 8v8"/></svg>`,
  droplet: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3s7 7.4 7 12a7 7 0 0 1-14 0c0-4.6 7-12 7-12Z"/><path d="M9 16c.6 1.7 1.8 2.6 3.7 2.6"/></svg>`,
  co2: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 15.5H6a4 4 0 1 1 1.2-7.8A5.5 5.5 0 0 1 18 9a3.5 3.5 0 0 1-.5 7H16"/><path d="M8 18c-.9 0-1.5-.6-1.5-1.5S7.1 15 8 15"/><path d="M11 18h-1.7v-3H11"/><path d="M14 18h-2v-.4c0-.7 1.8-1 1.8-2 0-.4-.3-.7-.8-.7"/></svg>`,
  air: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 8h12a3 3 0 1 0-2.7-4.3"/><path d="M3 13h16a3 3 0 1 1-2.7 4.3"/><path d="M4 18h7"/></svg>`,
  sound: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 15h4l6 4V5L8 9H4v6Z"/><path d="M17 9.5c1 .9 1.5 1.7 1.5 2.5S18 13.6 17 14.5"/><path d="M19.5 7c1.7 1.5 2.5 3.2 2.5 5s-.8 3.5-2.5 5"/></svg>`,
  light: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/></svg>`,
  flow: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h9a3 3 0 0 1 0 6H8"/><path d="M7 10 4 13l3 3"/><path d="M15 17h5"/><path d="M18 14l3 3-3 3"/></svg>`,
  gauge: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 14a8 8 0 1 1 16 0"/><path d="M12 14l4-4"/><path d="M7 18h10"/></svg>`,
  timer: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="13" r="7"/><path d="M9 2h6M12 6v7l4 2"/></svg>`,
  filter: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16l-6 7v5l-4 2v-7L4 5Z"/></svg>`,
  floor: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 17h18M5 13h14M7 9h10"/><path d="M8 20c1-1 1-2 0-3M13 20c1-1 1-2 0-3M18 20c1-1 1-2 0-3"/></svg>`,
  exhaust: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 4v8l5 3M12 12l-6 2M12 12l1 6"/></svg>`,
  water: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h12"/><path d="M8 4v5a4 4 0 0 0 8 0V4"/><path d="M10 16h4M12 16v4"/></svg>`,
  dew: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3s6 6.4 6 10.5a6 6 0 0 1-12 0C6 9.4 12 3 12 3Z"/><path d="M5 21h14"/></svg>`,
  status: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12l5 5L20 6"/></svg>`
};

const sceneMetricMap = {
  living: [
    { label: "室内温度", value: "24–26℃", icon: "temperature", description: "适合身体长期停留的温度区间" },
    { label: "相对湿度", value: "RH 45–55%", icon: "droplet", description: "让空气保持轻盈、不黏腻" },
    { label: "CO₂", value: "＜800 ppm", icon: "co2", description: "公共区空气持续更新" },
    { label: "噪声", value: "30–35 dB(A)", icon: "sound", description: "让家人的声音留下，设备退后" }
  ],
  masterBedroom: [
    { label: "温度", value: "23–24℃", icon: "temperature", description: "睡眠前后身体更容易放松" },
    { label: "相对湿度", value: "RH 45–55%", icon: "droplet", description: "降低闷湿与干燥打扰" },
    { label: "露点", value: "12–15℃", icon: "dew", description: "让空气水汽负担更轻" },
    { label: "噪声", value: "25–30 dB(A)", icon: "sound", description: "夜间低扰运行" },
    { label: "睡眠模式", value: "Silent", icon: "status", description: "系统在后台安静运行" }
  ],
  bathroom: [
    { label: "室温", value: "24–26℃", icon: "temperature", description: "洗浴前后空间不冷" },
    { label: "相对湿度", value: "RH 50–60%", icon: "droplet", description: "洗浴后湿气及时退去" },
    { label: "地面温度", value: "26–29℃", icon: "floor", description: "冬季脚感温暖" },
    { label: "排风量", value: "80–150 m³/h", icon: "exhaust", description: "湿气与异味有路径离开" },
    { label: "镜面状态", value: "Low Fog", icon: "status", description: "减少潮湿带来的雾气积累" }
  ],
  shower: [
    { label: "出水温度", value: "40–42℃", icon: "temperature", description: "身体被稳定热水包裹" },
    { label: "出水流量", value: "10–15 L/min", icon: "flow", description: "大流量花洒的舒适基础" },
    { label: "水压", value: "0.25–0.35 MPa", icon: "gauge", description: "多点用水时保持稳定" },
    { label: "热水等待", value: "＜10s", icon: "timer", description: "减少冬季洗浴前等待" },
    { label: "水质状态", value: "Filtered / Soft", icon: "filter", description: "触肤的水也被照顾" }
  ],
  kitchen: [
    { label: "饮水 TDS", value: "20–80 ppm", icon: "water", description: "按项目方案调整饮水口感" },
    { label: "余氯", value: "Low", icon: "filter", description: "减少饮水与洗食材异味" },
    { label: "出水流量", value: "1.5–2.5 L/min", icon: "flow", description: "烹饪与饮水使用更顺手" },
    { label: "水压", value: "Stable", icon: "gauge", description: "厨房用水保持稳定" },
    { label: "热水温度", value: "45–50℃", icon: "temperature", description: "清洗与烹饪更从容" }
  ],
  kitchenCooking: [
    { label: "厨房温度", value: "24–26℃", icon: "temperature", description: "烹饪时热感不扩散到全屋" },
    { label: "相对湿度", value: "RH 45–60%", icon: "droplet", description: "热气与湿气有路径离开" },
    { label: "补风状态", value: "Linked", icon: "air", description: "油烟机开启时自动补风" },
    { label: "压差", value: "微负压", icon: "gauge", description: "控制油烟与气味扩散" },
    { label: "噪声", value: "＜40 dB(A)", icon: "sound", description: "排风工作但不打扰相邻空间" }
  ],
  basement: [
    { label: "温度", value: "22–25℃", icon: "temperature", description: "地下空间适合长期停留" },
    { label: "相对湿度", value: "RH 50–60%", icon: "droplet", description: "减少潮、闷、霉味条件" },
    { label: "露点", value: "12–16℃", icon: "dew", description: "控制空气水汽负担" },
    { label: "CO₂", value: "＜800 ppm", icon: "co2", description: "地下空间空气持续更新" },
    { label: "PM2.5", value: "＜10 μg/m³", icon: "air", description: "影音空间保持洁净空气" },
    { label: "除湿状态", value: "Stable", icon: "status", description: "环境先稳定，空间才可用" }
  ],
  basementCinema: [
    { label: "温度", value: "23–24℃", icon: "temperature", description: "长时间观影时体感稳定放松" },
    { label: "相对湿度", value: "RH 50–55%", icon: "droplet", description: "多人停留也不闷、不燥" },
    { label: "CO₂", value: "＜750 ppm", icon: "co2", description: "多人观影时持续保持新鲜空气" },
    { label: "VOC", value: "Low", icon: "air", description: "软装、木作与设备区保持低挥发负担" },
    { label: "PM2.5", value: "＜8 μg/m³", icon: "filter", description: "屏幕空间保持细颗粒物低负担" }
  ],
  basementLivingSuite: [
    { label: "温度", value: "22–25℃", icon: "temperature", description: "地下生活层保持稳定舒适" },
    { label: "相对湿度", value: "RH 50–58%", icon: "droplet", description: "复合功能区也不返潮发闷" },
    { label: "CO₂", value: "＜800 ppm", icon: "co2", description: "厨房、卫浴、洗衣区都维持空气更新" },
    { label: "VOC", value: "Low", icon: "air", description: "柜体、洗护与清洁用品负担被控制" },
    { label: "排风状态", value: "Linked", icon: "status", description: "厨房、卫浴与洗衣区排风协同联动" }
  ]
};

const dimensionIcons = {
  Air: `
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M12 24h29c6 0 9-3 9-7 0-3.5-2.7-6-6.3-6-3 0-5.4 1.6-6.5 4.2" />
      <path d="M10 34h38c5.5 0 8 2.7 8 6.5S53.1 47 49.4 47c-3 0-5.4-1.6-6.6-4.1" />
      <path d="M16 44h18" />
    </svg>
  `,
  Water: `
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 8s15 17.2 15 31a15 15 0 0 1-30 0C17 25.2 32 8 32 8Z" />
      <path d="M24 40c1.2 5 4.6 7.5 9.5 7.5" />
    </svg>
  `,
  Light: `
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="9" />
      <path d="M32 9v8M32 47v8M9 32h8M47 32h8M15.8 15.8l5.7 5.7M42.5 42.5l5.7 5.7M48.2 15.8l-5.7 5.7M21.5 42.5l-5.7 5.7" />
    </svg>
  `,
  Sound: `
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M12 39h10l14 11V14L22 25H12v14Z" />
      <path d="M43 25c2.4 2.1 3.8 4.4 3.8 7s-1.4 4.9-3.8 7" />
      <path d="M49 18c4.8 3.8 7 8.4 7 14s-2.2 10.2-7 14" />
    </svg>
  `
};

const dimensions = [
  {
    title: "空气",
    en: "Air",
    image: "images/air-still-curtain-v2.webp",
    alt: "自然光卧室里的人在窗边呼吸，亚麻窗帘、绿植与轻盈空气感",
    text: "人的生命，就在一呼一吸之间。住宅里的空气，不是有没有风，而是这口气是否干净、轻松、稳定，能否承托清醒时的专注、夜晚的睡眠与长时间停留的舒适。真正好的空气，不会让人意识到系统在工作，只会让闷、困、异味与睡不深慢慢退下去，让呼吸重新成为一件自然的事。",
    quote: "好的空气，不是被察觉，而是让每一次呼吸都轻下来。"
  },
  {
    title: "水",
    en: "Water",
    image: "images/water.webp",
    alt: "高端住宅水与洗浴生活场景，温润石材、洁净用水与自然光",
    text: "水是生命之源，在住宅里，它也不只是到达而已。真正重要的，是这份水在家中以怎样的质量存在: 入口是否洁净安心，触肤是否温和细腻，热水是否稳定从容地抵达，每一个用水点是否都保持清洁、流动与可控。高品质住宅关心的，从来不是有没有水，而是水能否把饮水、洗漱、沐浴与清洁安静地承托起来。",
    quote: "好的水，不只是能用，而是始终洁净、稳定、从容。"
  },
  {
    title: "光",
    en: "Light",
    image: "images/light-dining-night-v6.webp",
    alt: "高层住宅夜间起居空间，木地板、布艺家具与柔和层次灯光营造安静放松的居住氛围，窗外可见湘江夜景",
    text: "住宅里的光，既是自然采光，也是夜晚灯光。白天，日光决定空间的清醒感、节律感与停留品质；夜晚，灯光则应顺着生活场景与身体状态层层收下，用亮度、层次与色温把人带回安静，而不是只把空间照亮。",
    quote: "好的光，白天尊重日光，夜晚顺应身体。"
  },
  {
    title: "声",
    en: "Sound",
    image: "images/sound.webp",
    alt: "安静住宅生活场景，音乐、阅读、柔和灯光与低噪氛围",
    text: "声的关键，不是让住宅里处处都有声音，而是让声音回到它该在的位置。该安静的卧室、书房与主要起居空间，不应被新风、排水、设备振动和低频干扰打断；而与户外温柔连接的阳台、檐下、庭院或花园边界，则可以自然承接雨声、风声与家人的声音。",
    quote: "好的住宅声环境，是该有声处有声，不该有声处无噪。"
  }
];

const climateModes = {
  springDamp: {
    tab: "春季潮湿",
    title: "春季潮湿：绿色很深，空气也很湿",
    text: "湖南春季并不只是万物生长。长时间阴雨、持续偏高的空气含湿量和不断升高的露点，会让墙面、地面、地下室、木作和衣物都进入潮湿状态。当露点高于冷表面温度，返潮、结露和霉味就会慢慢出现。",
    quote: "潮湿不是小问题，它会慢慢改变一个家的状态。",
    sample: { temperature: 21.5, humidity: 86 },
    mapImage: "images/changsha-climate-map-spring-v2.webp",
    panelTheme: "dark",
    tabTheme: "dark"
  },
  summerHotHumid: {
    tab: "夏季湿热",
    title: "夏季湿热：强阳光、高湿度与高露点叠加",
    text: "湖南夏季的难受，不只是温度高。强烈日照、城市热岛、洞庭湖与湘江水系带来的湿润背景共同作用，让空气像湿热的膜贴近身体。当温度、湿度和露点同时升高，汗液蒸发变慢，体感温度会被明显放大。",
    quote: "夏天真正难受的，不只是热，而是身体散不出去热。",
    sample: { temperature: 32.5, humidity: 76 },
    mapImage: "images/changsha-climate-map-summer-v2.webp",
    panelTheme: "light",
    tabTheme: "light"
  },
  shortComfortSeason: {
    tab: "秋季短暂",
    title: "秋季短暂：空气转轻，但窗口不长",
    text: "湖南秋季常常是最容易让身体放松的季节。湿度下降，空气变轻，阳光变柔，山色和植物开始出现暖黄与红色。但这段自然舒适窗口并不长，后续很快进入降温、阴雨和湿冷交替的状态。",
    quote: "好的住宅，不应该把室内环境完全交给天气。",
    sample: { temperature: 24, humidity: 48 },
    mapImage: "images/changsha-climate-map-autumn-v2.webp",
    panelTheme: "dark",
    tabTheme: "dark"
  },
  winterColdHumid: {
    tab: "冬季湿冷",
    title: "冬季湿冷：雨雪冰冻与冷湿空气贴近身体",
    text: "湖南冬季不是典型北方干冷。北部开口让冷湿空气容易进入，东、南、西三面山地又让它不容易快速散开。常青山色仍在，但绿色变暗，阴雨、雨夹雪、冰冻和低日照叠加后，身体感受到的是潮冷、阴冷、冷风贴身的湿冷。",
    quote: "冬天真正难受的，不只是温度低，而是湿冷一直贴在身体上。",
    sample: { temperature: 6.8, humidity: 88 },
    mapImage: "images/changsha-climate-map-winter-v2.webp",
    panelTheme: "dark",
    tabTheme: "dark"
  }
};

const climateModeOrder = ["springDamp", "summerHotHumid", "shortComfortSeason", "winterColdHumid"];

const dewSteps = [
  { max: 12, range: "≤12℃", label: "干爽", text: "空气水汽负担很低，身体散热更轻松。" },
  { max: 16, range: "12–16℃", label: "舒适", text: "空气较轻，适合较长时间停留。" },
  { max: 18, range: "16–18℃", label: "临界舒适 / 略有湿感", text: "湿感开始出现，但还没有明显闷热。" },
  { max: 20, range: "18–20℃", label: "湿感明显", text: "温度偏高时，身体会逐渐发闷。" },
  { max: 22, range: "20–22℃", label: "闷湿", text: "汗液蒸发变慢，散热压力增加。" },
  { max: 24, range: "22–24℃", label: "闷热 / 黏腻", text: "空气含湿量高，即使温度不算高也容易压迫。" },
  { max: Infinity, range: "≥24℃", label: "高湿热负担", text: "需要空气、除湿与冷源协同管理。" }
];

const deliveryCards = [
  ["先定义生活", "不是先问装什么设备，而是先把这个家未来如何呼吸、用水、停留和放松定义清楚。"],
  ["再判断边界", "建筑条件、空间尺寸、吊顶、设备间、检修路径和装修关系，要在一开始就被看见。"],
  ["把复杂变清楚", "计算、模拟、校核和碰撞，不是增加技术感，而是提前消除会影响体感的隐蔽问题。"],
  ["让系统进入空间", "成熟的设计，会让空气、水、排水、噪声和维护逻辑自然进入建筑与动线。"],
  ["把标准守到现场", "从图纸到施工、从节点到调试，交付不是重复图纸，而是把判断准确留在房子里。"],
  ["最后退到生活背后", "系统真正成立之后，设备不会成为主角，留下的只是健康、安静、稳定与从容。"]
];

const waterDemandCards = [
  ["住多少人", "家庭成员与客房使用频率，会共同影响用水量、热水响应和末端布置。"],
  ["哪些空间用水", "厨房、卫生间、洗衣房、地下室、吧台与露台，都会影响管路路径。"],
  ["水如何稳定到达", "给水管径、压力、增压、净水、软水、热水循环与远端响应，需要一起设计。"],
  ["水如何安静离开", "排水坡度、通气、防臭、地漏、同层排水、静音管材与检修路径，决定长期顺畅。"]
];

const adaptiveTextSelectors = [
  ".fit-card h3",
  ".water-demand-card h4",
  ".process-card h3",
  ".delivery-card summary"
];

const waterBrandCards = [
  ["GF", "给水管道与连接系统，支撑可靠管路和水力秩序。", ["给水管道", "连接工艺", "Hycleen"]],
  ["TECE", "暗装卫浴与墙前安装，让排水、冲水和空间秩序一起成立。", ["墙前安装", "隐藏水箱", "同层排水"]],
  ["Caleffi", "热水循环与平衡控制，帮助远近端热水更稳定。", ["热水循环", "平衡控制", "ThermoSetter"]],
  ["Oventrop", "热水系统与控制部件，支撑生活热水边界和系统控制。", ["Regumaq", "Fresh Water", "控制"]],
  ["DAB", "增压与恒压供水，支撑多楼层、多用水点稳定用水。", ["增压", "恒压", "多楼层"]],
  ["Culligan", "净水、软水、直饮水，支撑全屋水处理体验。", ["净水", "软水", "直饮水"]],
  ["Atlas Filtri", "前置过滤与分级过滤，让水质处理有路径。", ["前置过滤", "滤芯", "分级过滤"]],
  ["HOMA / Zoeller", "污水提升与排水设备，支撑地下室和低位排水空间。", ["污水提升", "排污泵", "低位排水"]]
];

const waterLifestyleCard = {
  title: "晨间洗漱与饮水",
  en: "Daily Water Experience",
  sceneType: "kitchen",
  image: "images/scene-water-vanity.webp",
  alt: "清晨高端住宅洗漱与饮水场景，暖色木作、自然光、台盆与饮水杯",
  feeling: "入口的水、触肤的水、离开的水，都安静而稳定。",
  quote: "好水不只是被过滤，也要保持流动。",
  tags: ["净水", "软水", "直饮水", "活水管路"],
  thinking: "高端住宅的水系统不是一台净水器。它从入户开始，经过过滤、软化、增压、分配、加热、循环、使用和排放，最终变成每天入口、触肤和清洁的水体验。",
  modules: [
    ["全屋水处理", "根据水质、用水点和生活方式配置净水、软水和直饮水路径。", ["净水", "软水", "直饮"]],
    ["活水管理", "低频用水点需要关注滞水、定排、度假模式和长期卫生管理。", ["活水", "定排", "度假"]],
    ["压力稳定", "多楼层、多用水点同时使用时，水压和流量要尽量稳定。", ["增压", "恒压", "多点"]]
  ],
  brands: [
    ["Culligan 康丽根", "中央净水、软水、直饮水支撑全屋水处理。", ["净水", "软水", "直饮"]],
    ["Atlas Filtri", "前置过滤、中央过滤和滤芯组合支撑分级过滤。", ["前置", "滤芯", "分级"]],
    ["DAB", "增压系统支撑多楼层稳定水压。", ["增压", "恒压", "水压"]]
  ]
};

const waterAccordionSections = [
  {
    title: "国际品牌，是基础；系统应用，才是价值",
    eyebrow: "Brands & Standards",
    intro: "泽丰选择国际品牌和欧洲标准，不是为了堆砌品牌，而是为了获得更成熟的材料体系、更稳定的连接工艺与更可控的长期可靠性。",
    quote: "品牌是基础，应用才是价值。",
    brands: waterBrandCards,
    splitCopy: [
      "泽丰选择国际品牌和欧洲标准，不是为了堆砌品牌，而是为了获得更成熟的材料体系、更稳定的连接工艺与更清晰的配件逻辑。",
      "真正的价值仍然来自系统应用，让给水、排水、热水、设备间与后期维护，在同一个住宅里形成清晰秩序。"
    ],
    supportImage: {
      src: "images/water-laundry-room-wide-v2.webp",
      alt: "高端住宅洗衣房全景，洗衣机、烘干机、整齐柜体、自然采光与宽阔动线共同呈现"
    }
  },
  {
    title: "让水安全、稳定、足量地到达",
    eyebrow: "Water Supply",
    intro: "花洒水量是否充足、多人同时用水是否稳定、远端水压是否不足、饮水是否安心，都不是单一材料能回答的问题。",
    quote: "给水的高级，不只是水能到，而是稳定、干净、可控地到达。",
    points: ["生活给水", "管材与连接工艺", "水压与流量", "增压系统", "净水与软水", "活水管路", "定期排水", "低频用水点管理"]
  },
  {
    title: "让水顺畅、安静、无味地离开",
    eyebrow: "Drainage",
    intro: "卫生间反臭、地漏干涸、排水噪音、淋浴排水慢、管道堵塞与检修困难，最终都会回到排水组织是否正确。",
    quote: "排水的高级，是顺畅离开，也安静离开。",
    points: ["排水坡度", "排水通气", "防臭设计", "地漏选择", "同层排水", "静音排水管", "检修口", "地下室污水提升"]
  },
  {
    title: "让热水及时、稳定、舒适地包裹身体",
    eyebrow: "Hot Water",
    intro: "洗澡前等热水、远端卫生间久等、花洒忽冷忽热、多人同时用水不稳定，都会直接影响身体感受。",
    quote: "热水不是设备功率，而是身体被热水包裹时的稳定感。",
    points: ["热源选择", "热水循环", "回水路径", "保温", "循环平衡", "恒温混水", "远端响应", "生活热水逻辑"]
  },
  {
    title: "把空间自由、排水安全和检修逻辑一起设计",
    eyebrow: "Same-floor Drainage",
    intro: "同层排水不是简单移马桶，也不是把管道藏起来。它关系到布局自由、排水坡度、防臭、通气、检修维护与长期可靠性。",
    quote: "同层排水的高级，不是把管道藏起来，而是把排水、防臭、检修和空间布局一起设计。",
    points: ["壁挂马桶", "隐藏水箱", "墙前安装", "同层排水", "地漏与水封", "排水通气", "检修逻辑"]
  },
  {
    title: "好水不只是被过滤，也要保持流动",
    eyebrow: "Fresh Water Management",
    intro: "别墅和大宅里，客房、地下室茶水点、备用卫生间、吧台与露台都可能长期低频使用。泽丰关注的，不只是净水器，而是整套管路的水如何保持更新。",
    quote: "真正健康的家庭用水，不应该只停留在净水器，而应该进入整个管路系统。",
    points: ["活水管路", "定期排水模式", "度假外出模式", "热水生活热水", "末端更新", "低频用水点管理", "智能控制"]
  },
  {
    title: "设计指导施工，施工还原设计",
    eyebrow: "Craft & Delivery",
    intro: "给排水系统不是现场凭经验把管道接起来。施工前就需要判断路径、管径、压力、坡度、通气、防臭、检修、保温、支架、设备位置与维护方式。",
    quote: "专业不是把管子装好，而是在施工前把水的一生想清楚。",
    points: ["前期沟通需求", "系统方案设计", "管线路径规划", "材料与工艺选择", "施工节点控制", "压力测试", "排水测试", "调试与交付", "后期维护"]
  }
];

const systems = [
  {
    title: "空气环境系统",
    en: "Air System",
    feeling: "闷、困、头晕、睡不深、房间有味道、空气不流动。",
    response: "新风、过滤、除湿、排风、CO₂、PM2.5、VOC、气流组织、地下室空气、厨房补风、卫生间排风。",
    quote: "空气的高级，不是风很强，而是人不再觉得闷。",
    image: "images/air-diagram.webp",
    tags: ["新风", "过滤", "除湿", "CO₂", "VOC", "厨房补风", "卫生间排风"],
    modules: [
      ["空气环境智能监测", "CO₂、PM2.5、VOC、温湿度传感器帮助系统理解空气状态，再自动调节新风量、排风量和温湿度。", ["空气监测", "PM2.5", "VOC"]],
      ["空气通风路径优化", "合理风管、风口和气流组织，让每个房间空气更新均匀、风感自然、噪音低。", ["气流组织", "低噪", "分区"]],
      ["厨房补风联动", "炒菜时门缝呼呼响、厨房门难开、油烟倒灌，往往来自排风和补风失衡。", ["负压可控", "补风联动", "全屋不扰"]],
      ["标准依据", "参考 WELL、ASHRAE、EN、GB/T 18883 等标准，把空气质量和舒适边界变成可讨论的设计条件。", ["WELL", "ASHRAE", "GB/T 18883"]]
    ],
    tools: [["厨房补风量估算器", "根据油烟机风量、厨房面积和补风路径，估算补风协调需求。"]],
    brands: [
      ["Brofer", "空气分布、线性风口和气流组织支撑空间美感与送风体验。", ["Air Diffusers", "Linear Slot", "Airflow"]],
      ["Östberg", "新风、风机、能量回收和转轮热回收支撑稳定通风。", ["Fresh Air", "Fans", "Energy Recovery"]]
    ]
  },
  {
    title: "水环境系统",
    en: "Water System",
    sceneType: "water",
    feeling: "喝入口是否安心，洗澡水是否稳定，远端热水是否等待，长期不用的管路是否滞水。",
    response: "给水、净水、软水、直饮水、增压、热水循环、活水管路、定排模式、度假模式、生活热水。",
    quote: "好水不只是被过滤，也要保持流动。",
    image: "images/water-diagram.webp",
    tags: ["给水", "净水", "软水", "直饮水", "增压", "热水循环", "活水"],
    modules: [
      ["热水远端快速响应", "多楼层、多卫生间住宅中，远端热水点应保持温度稳定和流量充足，减少等待。", ["循环泵", "热水平衡", "快速响应"]],
      ["活水管路与热水杀菌", "通过活水管路、定期排水、度假模式和生活热水，提升长期卫生管理能力。", ["鲜活水", "定排", "热水杀菌"]],
      ["远端等待估算", "热水等待不是小体验，它会影响冬天洗浴前的身体感受。", ["等待时间", "管径", "距离"]],
      ["品牌不是终点", "成熟产品体系是基础，真正价值仍来自设计、应用、施工、调试和维护。", ["产品基础", "系统应用", "长期维护"]]
    ],
    tools: [
      ["热水等待时间估算器", "估算远端卫生间热水到达时间，帮助理解循环系统价值。"],
      ["活水 / 定排模式演示器", "展示低频用水点如何通过定排和控制逻辑被系统记得。"]
    ],
    brands: [
      ["GF", "给水管道、Sanipex、Hycleen 支撑可靠管路与水力秩序。", ["Sanipex", "Hycleen", "Piping"]],
      ["Culligan 康丽根", "中央净水、软水、直饮水和全屋水处理支撑生活用水体验。", ["净水", "软水", "直饮水"]],
      ["Atlas Filtri", "前置过滤、中央过滤、滤芯和分级过滤支撑水质处理路径。", ["前置过滤", "滤芯", "分级过滤"]],
      ["DAB", "增压系统、恒压供水和多楼层稳定水压支撑多点用水。", ["增压", "恒压", "多楼层"]],
      ["Caleffi", "热水循环平衡与 ThermoSetter 支撑远近端热水稳定。", ["ThermoSetter", "循环", "平衡"]],
      ["Oventrop", "热水循环控制、Fresh Water Station、Regumaq 支撑生活热水边界。", ["Regumaq", "Fresh Water", "控制"]]
    ]
  },
  {
    title: "冷热舒适系统",
    en: "Thermal Comfort",
    feeling: "夏天不是越冷越好，冬天也不是越热越好，身体要的是温湿度、气流和辐射共同形成的平衡。",
    response: "空调、两联供、地暖、辐射舒适、湿度控制、露点控制、卫生间空调、电地暖。",
    quote: "热水不是设备功率，热舒适也不是温度数字，而是身体被环境稳定承托。",
    image: "images/thermal-comfort-diagram.webp",
    tags: ["空调", "两联供", "地暖", "辐射舒适", "露点控制", "卫生间空调"],
    modules: [
      ["露点控制", "只降温不除湿，身体仍会觉得闷。露点是判断空气湿重的重要指标。", ["露点", "除湿", "身体散热"]],
      ["卫生间空调与电地暖", "卫生间越小，越需要系统思维，让夏天不闷、冬天地面不冰。", ["空调", "电地暖", "干爽"]],
      ["厨房局部舒适", "烹饪时热、湿、油烟同时出现，需要排风和补风共同稳定。", ["厨房补风", "排风", "局部舒适"]]
    ]
  },
  {
    title: "排水与污水提升系统",
    en: "Drainage & Lifting",
    feeling: "夜里排水声音、卫生间反臭、地漏干涸、检修困难、马桶移位后排水慢，都会打断生活。",
    response: "PP 静音排水、同层排水、排水通气、防臭、地漏、污水提升、地下室排水。",
    quote: "同层排水的高级，不是把管道藏起来，而是把排水、防臭、检修和空间布局一起设计。",
    image: "images/drainage-diagram-v2.webp",
    alt: "高端地下生活套间真实场景，局部可视化展示排水路径与污水提升设备如何支撑低位空间使用",
    tags: ["PP 静音排水", "同层排水", "排水通气", "防臭", "污水提升"],
    modules: [
      ["排水通气", "排水是否顺畅，不只看管子粗细，也看坡度、通气、水封和路径。", ["坡度", "通气", "水封"]],
      ["地下室污水提升", "低位空间不能靠重力排水时，提升系统决定地下室是否真正可用。", ["地下室", "提升泵", "维护"]]
    ],
    brands: [
      ["HOMA", "德国污水提升、Saniflux、Sanistar 支撑低位排水。", ["Saniflux", "Sanistar", "提升"]],
      ["Zoeller", "美国排污泵、Grinder Pump、Qwik Jon 支撑排污和安装灵活性。", ["Grinder Pump", "Qwik Jon", "排污泵"]]
    ]
  },
  {
    title: "卫生间系统",
    en: "Bathroom System",
    feeling: "夏天上厕所闷热，冬天地砖冰脚，洗完澡湿气散不掉，马桶异味扩散。",
    response: "暗装水箱、壁挂马桶、同层排水、低位排风、马桶内排风、空调、电地暖、智慧排风。",
    quote: "卫生间越小，越需要系统思维。",
    image: "images/bathroom-negative-pressure.webp",
    tags: ["暗装水箱", "壁挂马桶", "低位排风", "马桶内排风", "电地暖", "智慧排风"],
    modules: [
      ["温湿度与排风控制", "空调、电地暖、负压低位排风、定点排风和智能排风协同控制温度、湿度和异味。", ["空调", "电地暖", "负压"]],
      ["马桶内排风", "异味在扩散之前被带走，比事后大风量排风更接近无感舒适。", ["排气三通", "低位排风", "异味抽排"]],
      ["同层排水", "排水、防臭、检修和空间布局需要一起设计，而不是只把管道藏起来。", ["同层", "检修", "防臭"]]
    ],
    brands: [["TECE", "墙前安装、壁挂马桶支架、隐藏水箱、冲水面板和淋浴排水支撑卫生间系统化。", ["Pre-wall", "隐藏水箱", "淋浴排水"]]]
  },
];

const sceneSystems = [
  {
    id: "air-dining-balance",
    title: "多人停留与持续烹煮并存时，空气仍应保持清爽、稳定与有边界。",
    en: "Dining Balance",
    sceneType: "living",
    image: "images/generated-air-scenes-v2/air-v2-dining-hotpot-family.webp",
    alt: "湖南高层住宅大餐厅家庭火锅场景，三代同堂六口之家围坐中式大圆桌，山水城景作为远景，空气状态安静稳定",
    feeling: "当热湿、气味、油脂微粒与 CO2 同时抬升，空气系统更重要的能力，是让餐叙之后的空间迅速回到干净、轻松、没有残留的状态。",
    quote: "好的空气，不会压住烟火气，只会让热闹过后仍然清爽。",
    tags: ["CO2 控制", "热湿回稳", "气味边界", "补排风协同"],
    thinking: "住宅餐厅的空气，不只处理温度，更要同时处理 CO2、气味、热湿负荷与油脂微粒。真正成熟的系统逻辑，是让新风、排风、补风与控湿协同工作，使空气边界清楚，主空间不被拖累。",
    modules: [
      ["六人停留", "三代同堂六人同时用餐时，CO2、新风量和停留舒适要被同时考虑。", ["CO2", "新风", "停留"]],
      ["火锅味边界", "锅底辛香、蒸汽和热油微粒需要被专门排走，避免残留到客厅和卧室。", ["气味", "排风", "边界"]],
      ["热湿回稳", "家庭火锅会让餐厅短时间升温升湿，湖南住宅里更需要控湿和补风一起介入。", ["控湿", "补风", "舒适"]]
    ],
    brands: [
      ["WHO", "帮助把空气健康目标落实到颗粒物与污染暴露控制上。", ["健康", "颗粒物", "空气质量"]],
      ["DOAS", "独立新风系统让家庭火锅场景里的空气更新、补风和排风更容易协同。", ["DOAS", "补风", "新风路径"]]
    ]
  },
  {
    id: "air-master-bedroom",
    title: "睡眠空间里的空气，应安静、低风感，并持续维持新鲜与干爽。",
    en: "Master Bedroom",
    sceneType: "quiet",
    image: "images/generated-air-scenes-v2/air-v2-master-bedroom-night.webp",
    alt: "湖南高端住宅主卧夜景场景，卧室克制温和，睡眠环境安静稳定，没有传统空调设备感",
    feeling: "卧室空气最重要的，不是存在感，而是让 CO2、湿度、温度均匀性与背景噪声一起退到身体感知之外，睡眠才会完整。",
    quote: "夜里真正好的空气，是让身体只感到修复，而感受不到系统。",
    tags: ["睡眠新风", "低风感", "恒湿", "低噪运行"],
    thinking: "主卧是住宅空气最应克制的地方。夜间空气的价值，在于持续控制 CO2、露点、湿度与噪声，让新鲜、干爽与稳定成为睡眠的底色，而不是靠强风或强冷制造舒适。",
    modules: [
      ["夜间新风", "睡眠时 CO2 不能悄悄抬高，新风要持续但不打扰。", ["DOAS", "CO2", "睡眠"]],
      ["恒湿温度", "主卧夜里的湿度、温度和表面温度要一起平稳，身体才会更容易修复。", ["控湿", "露点", "温度"]],
      ["静音末端", "主卧最怕夜里听到系统和风感，低噪低风感比强送风更重要。", ["低噪", "低风感", "末端"]]
    ],
    brands: [
      ["ASHRAE 55", "帮助把热舒适从温度延展到风速、湿度和辐射温度。", ["热舒适", "风速", "湿度"]],
      ["Radiant", "辐射调温更适合主卧整夜连续舒适，而不是靠强烈出风维持体感。", ["辐射", "地面调温", "低风感"]]
    ]
  },
  {
    id: "air-elder-bedroom",
    title: "长辈房的空气，应更重视温差收窄、湿冷缓解与风感降低。",
    en: "Elder Bedroom",
    sceneType: "quiet",
    image: "images/generated-air-scenes-v2/air-v2-elder-bedroom.webp",
    alt: "湖南庭院住宅长时休息空间，空气环境稳定安静，材质柔和",
    feeling: "这类空间更需要更小的表面温差、更低的风速、更稳定的干爽度，以及在夜间几乎不被察觉的运行背景。",
    quote: "温和，本身就是这类空气环境的品质。",
    tags: ["湿冷控制", "表面温差", "低风速", "夜间低噪"],
    thinking: "长辈房不适合用强送风换舒适，而应以更均匀的温度分布、更稳定的湿度和更安静的系统逻辑，去减轻湖南气候里的湿冷与压迫感。",
    airStats: {
      theme: "light",
      align: "left",
      status: "Gentle",
      heroLabel: "温差 / 风感",
      heroValue: "≤1.2℃ · Low",
      note: "更小温差与更低风感，比更强设备感更重要。",
      metrics: [
        ["温度", "23.6℃"],
        ["RH", "51%"],
        ["露点", "12.9℃"],
        ["表温差", "1.2℃"],
        ["CO₂", "726 ppm"],
        ["噪声", "30 dB"]
      ]
    },
    modules: [
      ["湿冷控制", "让空气和表面一起摆脱湖南冬季湿冷的压迫感。", ["湿冷", "保温", "表面温度"]],
      ["安静运行", "夜间低噪运行比白天更关键。", ["低噪", "睡眠", "稳定运行"]],
      ["脚下温和", "地暖和地面调温让长辈房从脚底开始更舒服。", ["地暖", "地面调温", "脚感"]]
    ],
    brands: [
      ["Warm Floor", "地面调温和地暖让长辈房的冬季舒适更完整。", ["地暖", "脚感", "湿冷"]],
      ["Controls", "温湿度和运行逻辑联动，避免忽冷忽热。", ["联动", "分区", "调试"]]
    ]
  },
  {
    id: "air-kids-zone",
    title: "儿童房空气，更重要的是长期稳定，而不是短时改善。",
    en: "Kids Bedroom",
    sceneType: "quiet",
    image: "images/generated-air-scenes-v2/air-v2-kids-bedroom-night-closed-curtains.webp",
    alt: "湖南城市高层住宅儿童睡眠空间夜景，空气保持安静、稳定与低干扰",
    feeling: "儿童房更看重持续新风、低 VOC、稳定湿度与安静背景，让夜间空气质量不因封闭停留而缓慢下滑。",
    quote: "与成长有关的空气，应该长期稳定，而不是偶尔达标。",
    tags: ["CO2 控制", "VOC 低暴露", "恒湿", "安静睡眠"],
    thinking: "儿童房的空气逻辑，在于把 CO2、VOC、颗粒物与湿度长期控制在更适合成长与休息的范围，让新鲜、洁净与安静成为日常，而不是靠临时纠偏补救。",
    airStats: {
      theme: "light",
      align: "right",
      status: "Growth",
      heroLabel: "CO₂ / VOC",
      heroValue: "662 ppm · Low",
      note: "持续新风与低 VOC 背景，使夜间空气质量保持平稳。",
      metrics: [
        ["温度", "23.1℃"],
        ["RH", "49%"],
        ["露点", "11.9℃"],
        ["PM2.5", "4 μg/m³"],
        ["含水量", "8.1 g/kg"],
        ["换气", "1.0 ACH"]
      ]
    },
    modules: [
      ["睡眠新风", "夜里 CO2 要持续被控制在更合适的区间，而不是等到发闷才纠偏。", ["CO2", "新风", "睡眠"]],
      ["温湿稳定", "孩子睡眠对黏闷、过冷和干燥都更敏感，温湿度要始终平顺。", ["控湿", "温度", "舒适"]],
      ["静音气流", "儿童房不能有明显风感和设备噪声，睡眠修复比快速降温更重要。", ["低风感", "低噪", "安睡"]]
    ],
    brands: [
      ["WHO", "把儿童长期停留空间的空气暴露控制落得更细。", ["健康", "空气质量", "颗粒物"]],
      ["WELL", "帮助把儿童卧室的健康空气与热舒适目标放进真实住宅使用里。", ["WELL", "空气", "热舒适"]]
    ]
  },
  {
    id: "air-reading-study",
    title: "书房空气，应让清醒感来自低 CO2、低噪声与无扰动气流。",
    en: "Reading Room",
    sceneType: "quiet",
    image: "images/generated-air-scenes-v2/air-v2-reading-study.webp",
    alt: "湖南高层住宅书房空间，木作与自然光克制温和，空气保持清醒与稳定",
    feeling: "专注型空气更重视 CO2 的持续控制、颗粒物过滤、低噪运行，以及桌面附近几乎无感的柔和气流。",
    quote: "真正的清醒感，常常来自空气没有形成任何拖拽。",
    tags: ["低 CO2", "颗粒物过滤", "低噪", "无扰动气流"],
    thinking: "书房空气不必被感知，却必须被控制。只有当 CO2、颗粒物、湿度和噪声一起被压低，专注才不会被空气悄悄打断。",
    airStats: {
      theme: "dark",
      align: "right",
      status: "Focus",
      heroLabel: "CO₂ / PM2.5",
      heroValue: "618 ppm · 5 μg/m³",
      note: "低噪与低扰动气流，使专注不被空气拖慢。",
      metrics: [
        ["温度", "24.0℃"],
        ["RH", "48%"],
        ["露点", "12.1℃"],
        ["含水量", "8.3 g/kg"],
        ["VOC", "0.17 mg/m³"],
        ["噪声", "29 dB"]
      ]
    },
    modules: [
      ["清醒空气", "CO2 稳定回落，长时间工作才不容易闷和困。", ["CO2", "新风", "专注"]],
      ["静音背景", "书房的低噪要求往往比客厅更高。", ["低噪", "减振", "无感"]],
      ["湿度稳定", "木作、书籍和织物都更适合在稳定湿度里停留。", ["恒湿", "木作", "材料"]]
    ],
    brands: [
      ["DOAS", "独立新风让书房空气更新更容易稳定下来。", ["DOAS", "新风", "低噪"]],
      ["Brofer", "气流组织更自然，减少桌面附近的扰动感。", ["风口", "气流", "无感"]]
    ]
  },
  {
    id: "air-tea-room",
    title: "局部热湿与水汽被及时带离，连续空间里的空气边界才会清楚。",
    en: "Tea Room",
    sceneType: "living",
    image: "images/generated-air-scenes-v2/air-v2-tea-balcony-snow-solid-wood-table.webp",
    alt: "长沙冬季高层住宅过渡空间，局部热湿与水汽被安静带离，空气边界清楚",
    feeling: "这类过渡空间考验的，是局部排风、温和补风与湿气边界控制，让轻微热湿负荷停在源头附近，不再回流主空间。",
    quote: "空气边界一旦清楚，空间关系就会自然轻下来。",
    tags: ["局部排风", "湿气边界", "补风节奏", "低噪处理"],
    thinking: "当局部热湿与水汽出现时，住宅空气系统更需要清楚的排风路径与补风节奏，让热湿负荷在发生处被带离，而不是重新扩散到主要起居区。",
    airStats: {
      theme: "light",
      align: "left",
      status: "Boundary",
      heroLabel: "水汽 / 排风",
      heroValue: "8.9 g/kg · ON",
      note: "局部热湿沿排风路径离开，主空间空气边界保持清楚。",
      metrics: [
        ["温度", "23.8℃"],
        ["RH", "47%"],
        ["露点", "11.6℃"],
        ["CO₂", "704 ppm"],
        ["PM2.5", "6 μg/m³"],
        ["换气", "1.2 ACH"]
      ]
    },
    modules: [
      ["智慧排风", "茶桌上方布置多个小型排风点，只在风口附近处理轻微水气和热湿负荷。", ["排风", "热湿负荷", "低噪"]],
      ["温和补风", "排出去的同时要有温和补风，不靠大风制造存在感。", ["补风", "DOAS", "无感"]],
      ["湿气边界", "局部空气边界被收住后，湿气和水气不会被带回主起居空间。", ["湿气", "边界", "舒适"]]
    ],
    brands: [
      ["DOAS", "让局部空间里的新风、补风和控湿分工更清楚。", ["DOAS", "新风", "控湿"]],
      ["Smart Exhaust", "顶部智慧排风决定热湿空气能不能被安静带走。", ["排风", "低噪", "路径"]]
    ]
  },
  {
    id: "air-music-collection",
    en: "Music & Collection",
    title: "恒湿、低尘与低噪背景稳定下来，材料状态与停留质感才会被同时保护。",
    feeling: "这类静态停留空间更看重湿度波动收窄、颗粒物沉降减少、空气洁净度提高，以及系统运行退回安静背景。",
    quote: "当空气退到背景，材料与细节才会被完整保存。",
    thinking: "收藏与音乐空间的空气价值，在于同时控制湿度波动、颗粒物与运行噪声，让材料保护与停留体验成为同一件事。",
    image: "images/generated-air-scenes-v2/air-v2-music-collection.webp",
    alt: "湖南高端住宅静态停留空间，空气背景安静、洁净、稳定",
    sceneType: "living",
    tags: ["恒湿", "低尘过滤", "低噪背景"],
    airStats: {
      theme: "dark",
      align: "right",
      status: "Preserve",
      heroLabel: "湿度波动",
      heroValue: "±3% RH",
      note: "恒湿与低尘背景，使材料状态与停留感同步稳定。",
      metrics: [
        ["温度", "23.9℃"],
        ["露点", "12.5℃"],
        ["含水量", "8.7 g/kg"],
        ["PM2.5", "5 μg/m³"],
        ["CO₂", "640 ppm"],
        ["噪声", "28 dB"]
      ]
    },
    modules: [
      ["恒湿保护", "唱片、书籍、木作和模型都不适合长期经历潮胀潮缩，湿度波动要被收窄。", ["恒湿", "材料保护", "长期稳定"]],
      ["低尘过滤", "收藏空间怕灰，也怕细颗粒物不断沉降，过滤和空气更新要持续而克制。", ["过滤", "低尘", "空气更新"]],
      ["安静背景", "音乐和独处需要安静背景，送回风和设备振动都不能破坏空间情绪。", ["低噪", "减振", "无感运行"]]
    ],
    brands: [
      ["WELL", "把长期停留空间的空气、舒适与健康边界放进统一判断。", ["空气", "舒适", "健康"]],
      ["DOAS", "让过滤、新风和控湿可以长期稳定地在背景里运行。", ["DOAS", "过滤", "控湿"]]
    ]
  },
  {
    id: "air-cinema-room",
    en: "Cinema Room",
    title: "封闭空间里的 CO2、热湿与背景噪声被压低，沉浸感才不会被打断。",
    feeling: "封闭停留空间首先要处理 CO2、显热、湿度与设备噪声的累积，而不是等到闷感出现后再用大风量补救。",
    quote: "沉浸感成立的前提，是空气系统始终退在后面。",
    thinking: "观影空间的空气重点，是以持续新风、低噪送回风、控湿与减振协同，让 CO2 和热湿压力被安静消化，不破坏沉浸本身。",
    image: "images/generated-air-scenes-v2/air-v2-cinema-large-dragon-screen.webp",
    alt: "湖南高端住宅封闭停留空间，CO2、热湿与背景噪声被稳定控制",
    sceneType: "quiet",
    tags: ["封闭空间 CO2", "低噪送风", "控湿", "减振"],
    airStats: {
      theme: "light",
      align: "right",
      status: "Cinema",
      heroLabel: "CO₂ / 噪声",
      heroValue: "736 ppm · 27 dB",
      note: "连续新风与减振协同，使沉浸不被空气系统打断。",
      metrics: [
        ["温度", "23.7℃"],
        ["RH", "49%"],
        ["露点", "12.7℃"],
        ["PM2.5", "5 μg/m³"],
        ["VOC", "0.19 mg/m³"],
        ["换气", "1.3 ACH"]
      ]
    },
    modules: [
      ["封闭空间新风", "长时间封闭停留时，新风要持续进入，但不能带来明显风声。", ["新风", "CO2", "封闭停留"]],
      ["低噪减振", "影音室对背景噪声敏感，末端、管路和主机振动都要被压低。", ["低噪", "减振", "声学"]],
      ["热湿稳定", "多人久坐和设备发热会改变体感，控湿与调温要平顺接住。", ["控湿", "调温", "稳定"]]
    ],
    brands: [
      ["ASHRAE 55", "把风速、湿度和表面温度纳入影音室的热舒适判断。", ["热舒适", "风速", "湿度"]],
      ["DOAS", "让封闭观影空间的新风和排风维持清楚路径。", ["DOAS", "新风", "排风"]]
    ]
  },
  {
    id: "air-esports-room",
    en: "Esports Room",
    title: "设备显热、CO2 与风噪被同时控制住，长时间停留才不会转向负担。",
    feeling: "高强度停留空间更依赖持续新风、显热处理、低风感与低噪背景并行成立，而不是靠强送风直接掩盖问题。",
    quote: "空气稳定下来，长时间停留才不会越坐越闷。",
    thinking: "当长时间停留与设备发热并存，住宅空气系统应同时处理 CO2、显热、湿度与风噪，让清爽感保持克制、持续且无打扰。",
    image: "images/generated-air-scenes-v2/air-v2-esports-room.webp",
    alt: "湖南高端住宅高强度停留空间，显热、CO2 与风噪被稳定控制",
    sceneType: "living",
    tags: ["显热处理", "CO2 控制", "低噪", "无直吹"],
    airStats: {
      theme: "light",
      align: "left",
      status: "Load",
      heroLabel: "显热 / CO₂",
      heroValue: "1.8 kW · 782 ppm",
      note: "局部显热被处理后，长时停留仍保持低风感与低噪背景。",
      metrics: [
        ["温度", "23.6℃"],
        ["RH", "50%"],
        ["露点", "12.8℃"],
        ["PM2.5", "6 μg/m³"],
        ["VOC", "0.22 mg/m³"],
        ["换气", "1.4 ACH"]
      ]
    },
    modules: [
      ["持续新风", "长时间游戏时，CO2 和闷感要持续被带走。", ["新风", "CO2", "久坐"]],
      ["热量处理", "电脑和屏幕发热需要被温和处理，不能靠强风直吹身体。", ["显热", "低风感", "调温"]],
      ["安静背景", "风噪和设备声不能压过游戏和交流本身。", ["低噪", "减振", "专注"]]
    ],
    brands: [
      ["WELL", "把长时间停留空间的空气、热舒适和噪声目标一起看待。", ["空气", "热舒适", "噪声"]],
      ["Controls", "分区控制让不同停留强度下的运行节奏保持稳定。", ["分区", "联动", "控制"]]
    ]
  },
  {
    id: "air-meditation-yoga",
    en: "Meditation & Yoga",
    title: "低风速、低噪声与稳定湿度，才是让呼吸真正放松下来的空气。",
    feeling: "低活动量空间会放大风速、噪声、表面温度与湿度变化，因此空气更应平顺、干爽、低感知。",
    quote: "当呼吸能够完整，空气往往已经先退到了后面。",
    thinking: "这类空间的空气应优先稳定低风速、低噪、表面温度与湿度，让身体在慢节奏里始终放松，而不是被送风与波动打扰。",
    image: "images/generated-air-scenes-v2/air-v2-meditation-yoga.webp",
    alt: "湖南高端住宅低活动量停留空间，空气平顺、干爽、低噪、没有干扰",
    sceneType: "quiet",
    tags: ["低风速", "低噪", "恒湿", "表面温和"],
    airStats: {
      theme: "dark",
      align: "right",
      status: "Calm",
      heroLabel: "风速 / RH",
      heroValue: "0.08 m/s · 48%",
      note: "低风速、低噪声与稳定湿度，使呼吸始终保持完整。",
      metrics: [
        ["温度", "23.4℃"],
        ["露点", "11.9℃"],
        ["含水量", "8.2 g/kg"],
        ["PM2.5", "4 μg/m³"],
        ["CO₂", "628 ppm"],
        ["噪声", "27 dB"]
      ]
    },
    modules: [
      ["低风速", "缓慢呼吸和拉伸时，明显出风会破坏身体节奏。", ["低风感", "风速", "呼吸"]],
      ["地面温度", "地面调温让身体接触空间时更温和。", ["地面调温", "表面温度", "脚感"]],
      ["湿度洁净", "软垫、织物和木地板都需要干爽洁净的背景。", ["恒湿", "过滤", "低尘"]]
    ],
    brands: [
      ["ASHRAE 55", "帮助把低活动量场景下的体感舒适判断得更细。", ["体感", "辐射", "风速"]],
      ["Radiant", "用表面温度参与舒适，而不是靠明显气流制造存在感。", ["辐射", "地面调温", "低风感"]]
    ]
  },
  {
    id: "air-kitchen-comfort",
    en: "Kitchen Air",
    title: "补风、排烟、热湿与气味边界被组织好，厨房空气才会真正干净。",
    feeling: "厨房空气系统的重点，不只在排烟量，更在补排风平衡、局部温度回落、湿度控制与气味不过界能否同时成立。",
    quote: "厨房空气真正要解决的，是边界，而不只是风量。",
    thinking: "开放厨房更需要把补风、排烟、热湿负荷与气味控制同步组织，让厨房空气的压力停留在边界之内，不外溢到客餐厅背景。",
    image: "images/generated-air-scenes-v2/air-v2-kitchen-comfort.webp",
    alt: "湖南高端住宅开放厨房空间，补风、排烟、热湿与气味边界清楚稳定",
    sceneType: "living",
    tags: ["补排风平衡", "热湿控制", "气味边界", "局部降温"],
    airStats: {
      theme: "light",
      align: "left",
      status: "Kitchen",
      heroLabel: "补排风 / VOC",
      heroValue: "Balanced · 0.28",
      note: "补排风边界被建立后，热湿与气味不会外溢至主空间。",
      metrics: [
        ["温度", "24.4℃"],
        ["RH", "53%"],
        ["露点", "14.1℃"],
        ["PM2.5", "8 μg/m³"],
        ["CO₂", "768 ppm"],
        ["换气", "1.8 ACH"]
      ]
    },
    modules: [
      ["补排风协同", "排烟机一旦工作，厨房就需要温和而明确的补风路径，避免全屋负压失衡。", ["补风", "排风", "协同"]],
      ["热湿回落", "湖南住宅做饭时不仅是热，还有蒸汽和潮感，厨房要有降温与排湿能力。", ["排湿", "降温", "热湿负荷"]],
      ["边界收住", "好的开放厨房不是完全没有味道，而是让味道和热气不过界。", ["边界", "气味", "客餐厅一体"]]
    ],
    brands: [
      ["DOAS", "独立新风系统更容易把厨房补风和全屋空气边界协同起来。", ["DOAS", "补风", "全屋协同"]],
      ["ASHRAE 55", "提醒厨房舒适不只看温度，也看风速、湿度和体感平衡。", ["风速", "湿度", "体感"]]
    ]
  },
  {
    id: "air-bathroom-comfort",
    en: "Bathroom Air",
    title: "排湿、异味控制与露点管理同时成立，卫生间空气才会长期干净。",
    feeling: "卫生间空气更看重源头异味抽排、洗浴后排湿、防结露与局部温感管理，而不是在潮气和气味扩散后再做补救。",
    quote: "长期干净的卫生间空气，来自持续而克制的管理。",
    thinking: "卫生间空气系统应把源头排风、排湿、露点控制与局部调温组织成一套持续逻辑，让异味、潮气与表面返潮始终停留在更低水平。",
    image: "images/generated-air-scenes-v2/air-v2-bathroom-comfort.webp",
    alt: "湖南高层住宅卫生间空气环境，排湿、异味控制与露点管理保持稳定",
    sceneType: "living",
    tags: ["马桶排风", "排湿", "露点控制", "局部调温"],
    airStats: {
      theme: "light",
      align: "right",
      status: "Dry",
      heroLabel: "露点 / 排湿",
      heroValue: "13.2℃ · ON",
      note: "排湿与露点管理并行，使异味与返潮维持在更低水平。",
      metrics: [
        ["温度", "24.1℃"],
        ["RH", "51%"],
        ["含水量", "9.0 g/kg"],
        ["PM2.5", "6 μg/m³"],
        ["VOC", "0.21 mg/m³"],
        ["换气", "2.0 ACH"]
      ]
    },
    modules: [
      ["马桶源头排风", "异味在扩散前被带走，比事后大风量排风更接近真正无味。", ["源头排风", "异味控制", "低位排风"]],
      ["地面与表面干燥", "卫浴电地暖、排湿和露点控制一起工作，空间更不容易返潮和积湿。", ["电地暖", "排湿", "露点控制"]],
      ["四季舒适", "春冬脚下不冷，夏天洗浴后不闷，卫生间才会真正愿意久用。", ["春冬", "夏季", "局部调温"]]
    ],
    brands: [
      ["TECE", "适合把壁挂马桶、隐藏水箱和马桶排风逻辑一起组织进卫浴系统。", ["TECE", "隐藏水箱", "马桶排风"]],
      ["DOAS", "帮助卫生间排风、补风和全屋空气边界保持清楚。", ["DOAS", "排风", "补风"]]
    ]
  }
];

const basementSceneSystems = [  {
    id: "basement-overview-system",
    title: "地下室不再是地下室",
    en: "Basement System",
    sceneType: "basement",
    image: "images/basement.webp",
    alt: "开阔高端别墅地下影音室与会客空间全景，空气更新、温湿度与低噪环境协同",
    feeling: "当排水、空气、湿度和温度被系统解决，它就成为家庭生活的另一层。",
    quote: "能让人久待，地下室才真正完成。",
    tags: ["污水提升", "空气环境", "除湿", "温度调控"],
    detailLabel: "查看地下室系统逻辑",
    thinking: "地下室是别墅功能最密集、环境最复杂的空间。设计师可以规划影音室、健身房、茶室、酒窖、储藏室、卫生间、洗衣房，但如果没有可靠排水和稳定空气环境，这些高功能空间很难长期成立。泽丰把地下室看作别墅最重要的 MEP 功能区：水要可靠离开，人要愿意停留。",
    modules: [
      ["水能离开 — 可靠污水提升泵", "卫生间、厨房和洗衣房如果低于重力排水条件，就需要可靠的污水提升系统。地下室功能越多，越不能忽视排水的稳定、检修和长期可靠。", ["污水提升", "低位排水", "检修维护"]],
      ["人能停留 — 空气环境系统", "夏天闷湿、冬天湿冷、梅雨季潮霉，都会让地下室失去生活性。新风、除湿、排风和温度调控共同决定地下空间能不能久待。", ["新风", "除湿", "温度调控"]]
    ],
    brands: [
      ["HOMA", "德国污水提升系统支撑地下室低位排水与复杂功能空间。", ["污水提升", "Saniflux", "Sanistar"]],
      ["Zoeller", "排污泵与提升方案，为地下室卫生间、洗衣房和远离重力排水点提供支撑。", ["排污泵", "Grinder Pump", "Qwik Jon"]]
    ]
  },
  {
    id: "basement-cinema-system",
    title: "影音室真正高级，是全家都愿意久待",
    en: "Basement Private Cinema",
    sceneType: "basementCinema",
    image: "images/generated-basement-scenes/basement-cinema-family-avatar.webp",
    alt: "高端别墅地下室家庭影音室全景，一家人正在舒适观影，空间宽阔、安静、灯光克制而高级",
    feeling: "影像沉浸、空气新鲜、温湿度稳定，长时间观影也不会觉得闷、累、燥。",
    quote: "真正好的影音室，不只是声画震撼，而是让身体愿意一直停留。",
    tags: ["影音室", "CO₂ 控制", "VOC 控制", "温湿稳定", "低噪环境"],
    detailLabel: "查看影音室环境逻辑",
    thinking: "地下室影音室往往会长时间聚集多人停留，如果空气更新不足、VOC 控制不稳、温湿度飘忽，沉浸感很快就会被闷、困、干或噪音打断。泽丰希望影音室不是只追求屏幕和音响，而是把空气、新风、除湿、温控与低噪一起做好，让沉浸真正成立。",
    modules: [
      ["多人停留的空气更新", "影音室门窗封闭、停留时间长，CO₂ 与新风策略决定观影中后段是否仍然舒服清醒。", ["CO₂", "新风", "长时间停留"]],
      ["温湿与露点控制", "观影空间灯光柔和、人多发热，如果除湿与温控不同步，空气很容易发闷。", ["温湿度", "露点", "除湿"]],
      ["低噪沉浸", "设备运行声、送风噪音、回风路径和振动控制，都要比普通空间更克制。", ["低噪", "减振", "沉浸感"]]
    ],
    brands: [
      ["Östberg", "稳定通风与低噪运行支撑长时间观影空间的空气更新。", ["低噪", "新风", "能量回收"]],
      ["Brofer", "风口与气流组织让送风退到幕后，不打断观影体验。", ["风口", "气流组织", "无感送风"]]
    ]
  },
  {
    id: "basement-living-suite-system",
    title: "地下室也可以拥有完整生活层",
    en: "Basement Living Suite",
    sceneType: "basementLivingSuite",
    image: "images/generated-basement-scenes/basement-suite-kitchen-bath-laundry.webp",
    alt: "高端别墅地下室生活层全景，厨房、卫生间与洗衣房被整合进开阔而高级的地下生活空间",
    feeling: "厨房、卫生间、洗衣房进入地下层之后，这里不再只是辅助空间，而是真正可生活的一层。",
    quote: "当地下室的水、空气与气味都被组织好，它就和地上一层一样值得生活。",
    tags: ["地下厨房", "地下卫浴", "洗衣房", "排风联动", "污水提升"],
    detailLabel: "查看地下生活层系统逻辑",
    thinking: "当地下室开始承担厨房、卫生间和洗衣房这些真实生活功能时，给排水、污水提升、排风、除湿、防臭和空气更新就必须同时成立。泽丰更关注的是：这些功能进入地下后，空间是否仍然保持整洁、安静、干爽与高级，而不是看起来像一个设备层或杂物层。",
    modules: [
      ["功能进入地下，水要可靠离开", "厨房、卫生间、洗衣房一旦进入地下层，排水路径、污水提升、防臭和检修逻辑必须被提前组织。", ["污水提升", "排水组织", "防臭检修"]],
      ["生活进入地下，空气要持续更新", "复合功能空间会叠加湿气、气味和热量，排风、新风与除湿必须按功能状态协同运行。", ["排风联动", "新风", "除湿"]],
      ["空间进入生活层，美感也要成立", "高端地下室不是把设备藏进去，而是让生活功能完整进入，同时依然保持空间感与秩序感。", ["空间秩序", "设备退后", "生活感"]]
    ],
    brands: [
      ["HOMA", "地下低位排水与复杂排放路径需要稳定污水提升系统支撑。", ["污水提升", "低位排水", "维护"]],
      ["Zoeller", "为地下卫浴与洗衣排水提供可靠排污与提升支持。", ["排污泵", "洗衣排水", "地下卫浴"]]
    ]
  },
];
const renderDimensions = () => {
  $("[data-dimensions]").innerHTML = dimensions
    .map(
      (item) => `
        <article class="dimension-card reveal tone-${item.en.toLowerCase()}" id="dimension-${item.en.toLowerCase()}">
          <div class="dimension-content">
            <div class="dimension-title-row">
              <div class="dimension-icon" aria-hidden="true">${dimensionIcons[item.en]}</div>
              <h3 class="dimension-title-inline"><span class="dimension-en">${item.en}</span><span class="dimension-zh">${item.title}</span></h3>
            </div>
            <blockquote>${item.quote}</blockquote>
            <p class="dimension-body">${item.text}</p>
            <details class="dimension-detail">
              <summary>查看这一维度</summary>
              <p>${item.text}</p>
            </details>
          </div>
          <figure class="dimension-media" id="dimension-${item.en.toLowerCase()}-media">
            <img src="${item.image}" alt="${item.alt}" loading="lazy" />
          </figure>
        </article>
      `
    )
    .join("");

  const dimensionsHeading = document.querySelector("#dimensions .section-heading");
  if (dimensionsHeading) {
    dimensionsHeading.style.maxWidth = "none";
    dimensionsHeading.style.width = "var(--zf-philosophy-full-width, calc(100vw - 64px))";
    dimensionsHeading.style.margin = "0 auto";
    dimensionsHeading.style.paddingLeft = "0";
    dimensionsHeading.style.textAlign = "left";
    ["p.eyebrow", "h2", "p.lead"].forEach((selector) => {
      const node = dimensionsHeading.querySelector(selector);
      if (!node) return;
      node.style.marginLeft = "0";
      node.style.marginRight = "auto";
      node.style.paddingLeft = "0";
      node.style.boxSizing = "border-box";
      node.style.textAlign = "left";
    });
  }
};

const renderClimateCards = () => {
  const tabs = $("[data-climate-tabs]");
  const detail = $("[data-climate-detail]");
  const stage = $("[data-climate-stage]");
  const mapImage = $(".climate-map img", stage);
  const dewPanel = $(".dewpoint-panel", stage);
  const tabRail = $("[data-climate-tabs]", stage);
  if (!tabs || !detail || !stage) return;

  const renderDetail = (mode) => {
    const item = climateModes[mode];
    if (!item) return;
    stage.dataset.climateMode = mode;
    if (mapImage && item.mapImage) mapImage.src = item.mapImage;
    if (dewPanel) dewPanel.dataset.theme = item.panelTheme || "dark";
    if (tabRail) tabRail.dataset.theme = item.tabTheme || "dark";
    detail.classList.remove("is-open");
    detail.innerHTML = "";
    $$(".climate-hotspot", tabs).forEach((button) => {
      const isActive = button.dataset.climateMode === mode;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-expanded", String(isActive));
    });
  };

  tabs.innerHTML = climateModeOrder
    .map(
      (mode, index) => `
        <button class="climate-hotspot climate-hotspot--${mode}" type="button" data-climate-mode="${mode}" aria-expanded="false" aria-label="${climateModes[mode].tab}">
          <span class="climate-hotspot-icon" aria-hidden="true">${index + 1}</span>
          <span class="climate-hotspot-label">${climateModes[mode].tab}</span>
        </button>
      `
    )
    .join("");

  $$(".climate-hotspot", tabs).forEach((button) => {
    button.addEventListener("click", () => renderDetail(button.dataset.climateMode));
  });

  renderDetail("summerHotHumid");
};

const initClimateTopicToggles = () => {
  const topics = $$("[data-climate-topic]");
  if (!topics.length) return;

  const toggleTopic = (targetKey) => {
    topics.forEach((topic) => {
      const isTarget = topic.dataset.climateTopic === targetKey;
      const shouldOpen = isTarget && !topic.classList.contains("is-open");
      const button = $(".climate-field-toggle", topic);
      const visual = $(".climate-cluster-visual", topic);

      topic.classList.toggle("is-open", shouldOpen);
      if (button) button.setAttribute("aria-expanded", String(shouldOpen));
      if (visual) visual.hidden = !shouldOpen;
    });
  };

  topics.forEach((topic) => {
    const button = $(".climate-field-toggle", topic);
    if (!button) return;
    button.addEventListener("click", () => toggleTopic(topic.dataset.climateTopic));
  });
};

const renderDeliveryCards = () => {
  const container = $("[data-delivery-cards]");
  if (!container) return;
  container.innerHTML = deliveryCards
    .map(
      ([title, text], index) => `
        <article class="delivery-card reveal" aria-label="${title}">
          <span class="delivery-card-index">0${index + 1}</span>
          <h3>${title}</h3>
          <p>${text}</p>
        </article>
      `
    )
    .join("");
};

const moduleCards = (modules = []) =>
  modules.length
    ? `<div class="module-grid">${modules
        .map(
          ([title, text, tags]) => `
            <article class="module-card">
              <h4>${title}</h4>
              <p>${text}</p>
              <div class="tag-list">${tagList(tags)}</div>
            </article>
          `
        )
        .join("")}</div>`
    : "";

const brandCards = (brands = []) =>
  brands.length
    ? `<div class="brand-grid">${brands
        .map(
          ([name, value, tags]) => `
            <article class="brand-card">
              <h4>${name}</h4>
              <p>${value}</p>
              <div class="tag-list">${tagList(tags)}</div>
              <details>
                <summary>展开详情</summary>
                <p>品牌不是终点，应用才是价值。泽丰关注产品进入真实住宅后的设计、施工、调试和维护表现。</p>
              </details>
            </article>
          `
        )
        .join("")}</div>`
    : "";

const waterBrandCardsMarkup = (brands = []) =>
  `<div class="water-brand-grid">${brands
    .map(
      ([name, value, tags]) => `
        <article class="water-brand-card">
          <h4>${name}</h4>
          <p>${value}</p>
          <div class="tag-list">${tagList(tags)}</div>
          <details>
            <summary>展开详情</summary>
            <p>品牌不是终点，应用才是价值。泽丰关注的是它如何进入具体家庭的水压、水质、路径、检修和长期维护里。</p>
          </details>
        </article>
      `
    )
    .join("")}</div>`;

const toolCards = (tools = []) =>
  tools.length
    ? `<div class="tool-grid">${tools
        .map(([title, text]) => `<article class="tool-card"><h4>${title}</h4><p>${text}</p><span class="tool-chip">轻量入口</span></article>`)
        .join("")}</div>`
    : "";

const metricBadges = (sceneType) => {
  const metrics = sceneMetricMap[sceneType] || sceneMetricMap.living;
  return `<div class="mep-metric-group" aria-label="场景 MEP 环境参数">${metrics
    .slice(0, 5)
    .map(
      (metric) => `
        <div class="mep-metric-badge" title="${metric.description}">
          <span class="metric-icon">${metricIcons[metric.icon] || metricIcons.status}</span>
          <span class="metric-copy">
            <span class="metric-label">${metric.label}</span>
            <strong class="metric-value">${metric.value}</strong>
          </span>
        </div>
      `
    )
    .join("")}</div>`;
};

const isBasementScene = (scene) =>
  scene.id === "basement-overview-system" ||
  scene.id?.startsWith("basement-") ||
  scene.sceneType === "basement" ||
  scene.sceneType === "basementCinema" ||
  scene.sceneType === "basementLivingSuite";

const environmentSceneSystems = sceneSystems;
let renderedSystemsPage = null;

const currentRoutePage = () => {
  const raw = window.location.hash.replace("#", "") || "home";
  return routeAliases[raw] || (pageRoutes[raw] ? raw : "home");
};

const renderAirStatsPhone = (scene) => {
  const stats = scene.airStats;
  if (!stats) return "";
  return `
    <aside class="scene-air-phone" data-theme="${stats.theme || "light"}" data-align="${stats.align || "right"}" aria-label="住宅空气参数">
      <span class="scene-air-phone-notch" aria-hidden="true"></span>
      <div class="scene-air-phone-topbar">
        <span>Indoor Air</span>
        <strong>${stats.status || "Stable"}</strong>
      </div>
      <div class="scene-air-phone-hero">
        <span>${stats.heroLabel || "空气状态"}</span>
        <strong>${stats.heroValue || ""}</strong>
      </div>
      <div class="scene-air-phone-grid">
        ${(stats.metrics || [])
          .map(
            ([label, value]) => `
              <div><span>${label}</span><strong>${value}</strong></div>
            `
          )
          .join("")}
      </div>
      <p>${stats.note || ""}</p>
      <span class="scene-air-phone-home" aria-hidden="true"></span>
    </aside>
  `;
};

const renderSystems = () => {
  const page = currentRoutePage();
  const cardsRoot = $("[data-system-cards]");
  if (!cardsRoot) return;

  const shouldRenderScenes = page === "basement-system" || page === "systems" || page === "climate";
  if (!shouldRenderScenes) {
    if (renderedSystemsPage !== "empty") {
      cardsRoot.innerHTML = "";
      renderedSystemsPage = "empty";
    }
    return;
  }

  if (renderedSystemsPage === page) return;
  renderedSystemsPage = page;

  const visibleScenes = page === "basement-system" ? basementSceneSystems : environmentSceneSystems;
  const shouldShowSceneMetrics = page !== "systems" && page !== "climate";

  cardsRoot.innerHTML = visibleScenes
    .map(
      (scene) => {
        const detailMarkup =
          page === "systems"
            ? ""
            : `
            <details class="scene-detail">
              <summary>${scene.detailLabel || "查看背后的 MEP 思路"}</summary>
              <div class="scene-detail-body">
                <p>${scene.thinking}</p>
                ${moduleCards(scene.modules)}
                ${brandCards(scene.brands)}
              </div>
            </details>
          `;
        const contentMarkup = `
          <div class="scene-content">
            <p class="eyebrow">${scene.en}</p>
            <h3>${scene.title}</h3>
            <p class="scene-feeling">${scene.feeling}</p>
            <blockquote class="card-quote">${scene.quote}</blockquote>
            <div class="tag-list">${tagList(scene.tags)}</div>
            ${detailMarkup}
          </div>
        `;
        const mediaMarkup = `
          <figure class="scene-media" ${scene.id === "air-kids-zone" ? 'data-air-particles="true"' : ""}>
            <img src="${scene.image}" alt="${scene.alt}" loading="lazy" />
            ${page === "systems" || page === "climate" ? renderAirStatsPhone(scene) : ""}
          </figure>
        `;
        return `
        <article class="system-scene-card reveal" ${scene.id ? `id="${scene.id}"` : ""} data-scene-type="${scene.sceneType || "living"}" data-route-group="${isBasementScene(scene) ? "basement" : "environment"}">
          ${page === "systems" || page === "climate" ? contentMarkup : mediaMarkup}
          ${shouldShowSceneMetrics ? metricBadges(scene.sceneType) : ""}
          ${page === "systems" || page === "climate" ? mediaMarkup : contentMarkup}
        </article>
      `;
      }
    )
    .join("");
};

const renderWaterSupply = () => {
  const demand = $("[data-water-demand]");
  const accordion = $("[data-water-accordion]");
  const livingCard = $("[data-water-living-card]");
  if (!demand || !accordion || !livingCard) return;
  const accordionGroups = [
    {
      eyebrow: "Water System Layers",
      title: "水的安全到达、稳定使用与安静离开，要被作为一个整体来设计",
      copy: [
        "国际品牌和欧洲标准只是基础，真正的价值，来自给水、排水、热水与设备控制在同一个住宅中的完整应用。",
        "从入口水质、增压稳压、远端热水响应，到排水坡度、防臭、水封、通气与静音组织，只有路径被一起想清楚，水系统才会真正稳定。"
      ],
      image: "images/scene-rain-shower.webp",
      metricScene: "shower"
    },
    {
      eyebrow: "Fresh Water · Delivery",
      title: "低频用水点、同层排水与施工交付，决定系统能否长期稳定",
      copy: [
        "同层排水关系到空间自由、防臭、检修与长期可靠性；别墅和大宅里的低频用水点，也不能只装净水，而要通过活水、定排与控制逻辑保持更新。",
        "当这些问题被继续落实到管线路径、施工节点、压力测试、排水测试与后期维护里，给排水系统才能真正耐住时间，而不只是短期看起来完整。"
      ],
      image: "images/water-system-layers-secondary-v1.webp",
      metricScene: "kitchen"
    }
  ];

  livingCard.innerHTML = `
    <article class="system-scene-card reveal water-scene-card" data-scene-type="${waterLifestyleCard.sceneType}">
      <figure class="scene-media">
        <img src="${waterLifestyleCard.image}" alt="${waterLifestyleCard.alt}" loading="lazy" />
        ${metricBadges(waterLifestyleCard.sceneType)}
      </figure>
      <div class="scene-content">
        <p class="eyebrow">${waterLifestyleCard.en}</p>
        <h3>${waterLifestyleCard.title}</h3>
        <p class="scene-feeling">${waterLifestyleCard.feeling}</p>
        <blockquote class="card-quote">${waterLifestyleCard.quote}</blockquote>
        <div class="tag-list">${tagList(waterLifestyleCard.tags)}</div>
        <details class="scene-detail">
          <summary>查看背后的 MEP 思路</summary>
          <div class="scene-detail-body">
            <p>${waterLifestyleCard.thinking}</p>
            ${moduleCards(waterLifestyleCard.modules)}
            ${brandCards(waterLifestyleCard.brands)}
          </div>
        </details>
      </div>
    </article>
  `;

  demand.innerHTML = waterDemandCards
    .map(
      ([title, text]) => `
        <details class="water-demand-card">
          <summary>
            <h4>${title}</h4>
            <span>展开</span>
          </summary>
          <p>${text}</p>
        </details>
      `
    )
    .join("");

  accordion.innerHTML = waterAccordionSections
    ? `
      ${accordionGroups
        .map(
          (group) => `
            <section class="water-accordion-group">
              <div class="water-accordion-copy">
                <p class="eyebrow">${group.eyebrow}</p>
                <h3>${group.title}</h3>
                ${group.copy.map((item) => `<p>${item}</p>`).join("")}
              </div>
              <figure class="water-accordion-visual">
                <img src="${group.image}" alt="${group.title}" loading="lazy" />
                ${group.metricScene ? metricBadges(group.metricScene) : ""}
              </figure>
            </section>
          `
        )
        .join("")}
    `
    : "";
};

const waterSceneStates = {
  morning: {
    kicker: "Water Entry",
    status: "Stable",
    theme: "light",
    contrast: "mist",
    align: "left",
    valign: "top",
    size: "micro",
    heroLabel: "末端响应 / 水质",
    heroValue: "3s · Clear",
    note: "晨起第一处用水，应该干净、及时、没有迟疑。",
    metrics: [
      ["静压", "0.29 MPa"],
      ["出水响应", "3 s"],
      ["浊度", "0.4 NTU"],
      ["余氯", "0.05 mg/L"]
    ]
  },
  kitchen: {
    kicker: "Kitchen Flow",
    status: "Balanced",
    theme: "dark",
    contrast: "ink",
    align: "left",
    valign: "bottom",
    heroLabel: "净饮 / 热水",
    heroValue: "Dual Stable",
    note: "净饮、主龙头与热水同时在线，厨房节奏才会真正从容。",
    metrics: [
      ["净饮 TDS", "38 ppm"],
      ["热水等待", "6 s"],
      ["末端流量", "9.2 L/min"],
      ["排水噪声", "Low"]
    ]
  },
  shower: {
    kicker: "Shower Balance",
    status: "Quiet",
    theme: "light",
    contrast: "mist",
    align: "right",
    valign: "bottom",
    heroLabel: "温度 / 压力",
    heroValue: "38.5°C · Stable",
    note: "温度、压力和回水稳定之后，沐浴才会从清洁变成放松。",
    metrics: [
      ["混水波动", "±0.4°C"],
      ["末端压力", "0.31 MPa"],
      ["回水等待", "7 s"],
      ["触肤硬度", "48 ppm"]
    ]
  },
  drainage: {
    kicker: "Silent Drain",
    status: "Quiet",
    theme: "dark",
    contrast: "ink",
    align: "right",
    valign: "bottom",
    heroLabel: "排水 / 防臭",
    heroValue: "Smooth Out",
    note: "水要安静离开，声音与气味都不应重新回到室内。",
    metrics: [
      ["坡度状态", "OK"],
      ["水封", "50 mm"],
      ["通气", "Stable"],
      ["夜间噪声", "< 35 dB"]
    ]
  },
  garden: {
    kicker: "Garden Water",
    status: "Scheduled",
    theme: "dark",
    contrast: "ink",
    align: "left",
    valign: "bottom",
    heroLabel: "灌溉 / 分区",
    heroValue: "4 Zones",
    note: "庭院的生长节奏，不该靠反复记得，而应来自稳定的水路安排。",
    metrics: [
      ["灌溉分区", "4"],
      ["补水时段", "05:30"],
      ["喷灌压力", "0.24 MPa"],
      ["雨天联动", "On"]
    ]
  },
  "soft-rain": {
    kicker: "Soft Rain",
    status: "Comfort",
    theme: "light",
    contrast: "mist",
    align: "right",
    valign: "bottom",
    heroLabel: "水感 / 恒温",
    heroValue: "Fine · Soft",
    note: "顶喷与肩颈水流被调得刚好，水感才会更柔和、更像恢复。",
    metrics: [
      ["喷淋流量", "12 L/min"],
      ["恒温偏差", "±0.3°C"],
      ["回水状态", "On"],
      ["软水状态", "Ready"]
    ]
  },
  island: {
    kicker: "Island Hub",
    status: "Coordinated",
    theme: "light",
    contrast: "mist",
    align: "left",
    valign: "top",
    size: "micro",
    heroLabel: "清洗 / 净饮",
    heroValue: "Linked",
    note: "同一处发生多种用水时，系统越稳定，动作就越连贯。",
    metrics: [
      ["主龙头", "7.8 L/min"],
      ["净饮端", "1.6 L/min"],
      ["热水响应", "5 s"],
      ["排水回落", "Fast"]
    ]
  },
  drinking: {
    kicker: "Daily Drinking",
    status: "Fresh",
    theme: "light",
    contrast: "mist",
    align: "left",
    valign: "top",
    size: "micro",
    heroLabel: "净饮 / 加热",
    heroValue: "Cup Ready",
    note: "一杯水和一壶茶，都不应该额外等待与迁就。",
    metrics: [
      ["净饮 TDS", "26 ppm"],
      ["加热待机", "Yes"],
      ["即取温水", "45°C"],
      ["异味等级", "Minimal"]
    ]
  },
  "fresh-loop": {
    kicker: "Fresh Loop",
    status: "Active",
    theme: "light",
    contrast: "mist",
    align: "left",
    valign: "top",
    size: "micro",
    heroLabel: "低频水点 / 更新",
    heroValue: "Auto Refresh",
    note: "低频空间也要一直保持清洁感，而不是在久置后才想起它们。",
    metrics: [
      ["定排周期", "72 h"],
      ["冲洗时长", "45 s"],
      ["滞水风险", "Low"],
      ["末端气味", "Clear"]
    ]
  },
  "ro-kitchen": {
    kicker: "RO Cooking",
    status: "Precise",
    theme: "dark",
    contrast: "ink",
    align: "left",
    valign: "bottom",
    heroLabel: "纯水 / 烹饪",
    heroValue: "Taste Ready",
    note: "当水进入烹饪，洁净度与口感层次也会一起进入味道本身。",
    metrics: [
      ["RO TDS", "12 ppm"],
      ["纯水流量", "1.2 L/min"],
      ["软水旁路", "Linked"],
      ["热水供应", "Stable"]
    ]
  },
  "silent-drain": {
    kicker: "Night Drain",
    status: "Low Noise",
    theme: "dark",
    contrast: "ink",
    align: "right",
    valign: "bottom",
    heroLabel: "噪声 / 水封",
    heroValue: "Silent Exit",
    note: "真正好的排水，往往存在于几乎没有人察觉它的时候。",
    metrics: [
      ["立管包覆", "Done"],
      ["夜间噪声", "31 dB"],
      ["水封高度", "50 mm"],
      ["返味风险", "Low"]
    ]
  },
  "balanced-flow": {
    kicker: "Pressure Balance",
    status: "Stable",
    theme: "dark",
    contrast: "ink",
    align: "left",
    valign: "top",
    heroLabel: "多点用水 / 平衡",
    heroValue: "No Steal",
    note: "多点同时开启时，也不应彼此牵制、忽强忽弱。",
    metrics: [
      ["分区压力", "0.30 MPa"],
      ["同时系数", "3 points"],
      ["流量平衡", "OK"],
      ["增压状态", "Normal"]
    ]
  },
  "hot-water": {
    kicker: "Hot Water",
    status: "Ready",
    theme: "light",
    contrast: "mist",
    align: "right",
    valign: "bottom",
    heroLabel: "循环 / 温控",
    heroValue: "6 s · Stable",
    note: "热水真正被做好之后，人不会再把等待当成理所当然。",
    metrics: [
      ["回水等待", "6 s"],
      ["供水温度", "49°C"],
      ["末端混水", "38°C"],
      ["防烫保护", "On"]
    ]
  },
  "auto-flush": {
    kicker: "Auto Flush",
    status: "Maintained",
    theme: "dark",
    contrast: "ink",
    align: "right",
    valign: "top",
    heroLabel: "低频点位 / 活水",
    heroValue: "Routine On",
    note: "低频点位被温柔地维持在新鲜状态，空间才不会积累滞水风险。",
    metrics: [
      ["冲洗间隔", "96 h"],
      ["单次冲洗", "60 s"],
      ["阀门状态", "Auto"],
      ["水龄", "Controlled"]
    ]
  },
  "sewage-lift": {
    kicker: "Sewage Lift",
    status: "Reliable",
    theme: "dark",
    contrast: "ink",
    align: "left",
    valign: "bottom",
    heroLabel: "提升 / 备用",
    heroValue: "Basement Ready",
    note: "地下空间要真正可用，排水提升就必须稳定而低存在感。",
    metrics: [
      ["启停液位", "OK"],
      ["提升扬程", "8.5 m"],
      ["备用状态", "Standby"],
      ["报警联动", "Ready"]
    ]
  },
  "rainwater-lift": {
    kicker: "Rain Lift",
    status: "Prepared",
    theme: "dark",
    contrast: "ink",
    align: "right",
    valign: "bottom",
    heroLabel: "集水 / 提升",
    heroValue: "Storm Ready",
    note: "雨水被提前安排好去路，暴雨来临时空间才会保持安静与安心。",
    metrics: [
      ["集水坑", "Normal"],
      ["提升流量", "18 m³/h"],
      ["液位报警", "On"],
      ["倒灌风险", "Low"]
    ]
  }
};

const renderWaterScenePhones = () => {
  const scenes = Array.from(document.querySelectorAll('#water-supply-drainage [data-water-state]'));
  if (!scenes.length) return;

  scenes.forEach((scene) => {
    const key = scene.dataset.waterState;
    const data = waterSceneStates[key];
    const media = scene.querySelector('.water-proof-media');
    if (!data || !media) return;
    if (media.querySelector('.scene-water-phone')) return;

    const phone = document.createElement('aside');
    phone.className = 'scene-water-phone';
    phone.dataset.theme = data.theme;
    phone.dataset.align = data.align || 'right';
    phone.dataset.valign = data.valign || 'bottom';
    phone.dataset.contrast = data.contrast || 'mist';
    phone.dataset.size = data.size || 'regular';
    phone.setAttribute('aria-hidden', 'true');
    phone.innerHTML = `
      <span class="scene-water-phone-notch"></span>
      <div class="scene-water-phone-topbar">
        <span>${data.kicker}</span>
        <strong>${data.status}</strong>
      </div>
      <div class="scene-water-phone-hero">
        <span>${data.heroLabel}</span>
        <strong>${data.heroValue}</strong>
      </div>
      <div class="scene-water-phone-grid">
        ${data.metrics.map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join('')}
      </div>
      <p>${data.note}</p>
      <span class="scene-water-phone-home"></span>
    `;
    media.appendChild(phone);
  });
};

const pageRoutes = {
  home: ["landing", "home-large-home", "home-nourishes", "home"],
  philosophy: ["home", "dimensions", "home-capabilities", "philosophy-cases"],
  dimensions: ["home", "dimensions", "home-capabilities", "philosophy-cases"],
  climate: ["climate", "environment-problem", "environment-logic", "air-feeling-bridge", "systems"],
  "water-supply-drainage": ["water-problem", "water-logic", "water-supply-drainage"],
  systems: ["climate", "environment-problem", "environment-logic", "systems"],
  "basement-system": [
    "basement-definition",
    "basement-problem",
    "basement-logic",
    "basement-lifting",
    "basement-sport-layer",
    "basement-reading-layer",
    "basement-dining-layer",
    "basement-tea-room-layer",
    "basement-cigar-layer",
    "basement-wine-layer",
    "basement-game-layer",
    "basement-party-layer",
    "basement-meditation-layer",
    "basement-summary"
  ],
  delivery: [
    "fit",
    "delivery-product-logic",
    "delivery-outputs",
    "delivery-method",
    "constraints",
    "delivery-brief",
    "integration",
    "delivery",
    "team-execution",
    "delivery-commissioning",
    "process",
    "delivery-result"
  ],
  "project-access": ["project-access"]
};

const routeAliases = {
  landing: "home",
  "home-large-home": "home",
  "home-nourishes": "home",
  "home-health-comfort": "home",
  "home-capabilities": "philosophy",
  "philosophy-life": "philosophy",
  air: "systems",
  water: "water-supply-drainage",
  "delivery-page": "delivery",
  "delivery-outputs": "delivery",
  "delivery-method": "delivery",
  "delivery-stages": "delivery",
  constraints: "delivery",
  "delivery-brief": "delivery",
  "environment-problem": "systems",
  "environment-logic": "systems",
  "air-feeling-bridge": "systems",
  "philosophy-archive": "philosophy",
  "water-problem": "water-supply-drainage",
  "water-logic": "water-supply-drainage",
  "basement-environment-simulator": "basement-system",
  "basement-problem": "basement-system",
  "basement-logic": "basement-system",
  "basement-lifting": "basement-system",
  "basement-sport-layer": "basement-system",
  integration: "delivery",
  "team-execution": "delivery",
  "delivery-commissioning": "delivery",
  process: "delivery",
  "delivery-result": "delivery",
  "project-access-contact": "project-access",
  "project-access-network": "project-access",
  "project-access-expertise-title": "project-access"
};

const routeScrollTargets = {
  home: "landing",
  philosophy: "home",
  dimensions: "dimensions",
  climate: "climate",
  "water-supply-drainage": "water-problem",
  systems: "climate",
  "basement-system": "basement-definition",
  delivery: "fit",
  "project-access": "project-access"
};

const initPageRouter = () => {
  const sections = $$("main > section");
  const navLinks = $$("a[href^='#']");
  const desktopNavLinks = $$(".desktop-nav a[href^='#']");
  const preciseHover = window.matchMedia("(hover: hover) and (pointer: fine)");
  let hoverRouteTimer;
  history.scrollRestoration = "manual";

  desktopNavLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      if (!preciseHover.matches) return;
      window.clearTimeout(hoverRouteTimer);
    });

    link.addEventListener("mouseleave", () => {
      window.clearTimeout(hoverRouteTimer);
    });
  });

  const pageForHash = () => {
    const raw = window.location.hash.replace("#", "") || "home";
    return routeAliases[raw] || (pageRoutes[raw] ? raw : "home");
  };

  const scrollToRouteTarget = (target, options = {}) => {
    if (!target) return;
    const { alignPageTop = false } = options;
    if (alignPageTop) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }
    const header = document.querySelector("[data-header]");
    const headerHeight = header ? header.getBoundingClientRect().height : 0;
    const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerHeight - 18);
    window.scrollTo({ top, left: 0, behavior: "auto" });
  };

  const refreshRouteTypography = () => {
    // The delivery route is finalized by global-structure-v1.js after routing.
    // Its legacy typography pass removes the editorial inline layout on the
    // next frame, which makes a direct first load differ from a refresh.
    if (document.body.dataset.page === "delivery") return;
    if (typeof applyGlobalTypographyLock !== "function") return;
    applyGlobalTypographyLock();
    if (typeof applyPageCohesionInlineLock === "function") {
      applyPageCohesionInlineLock();
    }
    requestAnimationFrame(() => {
      applyGlobalTypographyLock();
      if (typeof applyPageCohesionInlineLock === "function") {
        applyPageCohesionInlineLock();
      }
    });
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = link.getAttribute("href");
      if (!target || !target.startsWith("#")) return;
      const key = target.replace("#", "") || "home";
      if (!pageRoutes[key] && !routeAliases[key]) return;
      event.preventDefault();
      window.clearTimeout(hoverRouteTimer);
      if (window.location.hash !== target) {
        history.pushState(null, "", target);
      }
      applyRoute();
    });
  });

  const applyRoute = () => {
    const raw = window.location.hash.replace("#", "") || "home";
    const page = pageForHash();
    const activeIds = new Set(pageRoutes[page] || pageRoutes.home);
    renderSystems();
    document.documentElement.dataset.page = page;
    document.body.dataset.page = page;
    sections.forEach((section) => {
      if (section.classList.contains("retired-section")) {
        section.classList.add("route-hidden");
        section.hidden = true;
        section.style.display = "none";
        return;
      }
      const shouldHideSection = !activeIds.has(section.id);
      section.classList.toggle("route-hidden", shouldHideSection);
      section.hidden = shouldHideSection;
      section.style.display = shouldHideSection ? "none" : "";
    });
    const showSystemsGrid = page === "systems" || page === "climate";
    const systemsSection = document.getElementById("systems");
    if (systemsSection) {
      systemsSection.classList.toggle("route-hidden", !showSystemsGrid);
      systemsSection.hidden = !showSystemsGrid;
      systemsSection.style.display = showSystemsGrid ? "" : "none";
    }

    $$(".system-scene-card").forEach((card) => {
      const isBasementRoute = page === "basement-system";
      const isBasementScene = card.dataset.routeGroup === "basement";
      const isSystemsRoute = page === "systems";
      const shouldHide =
        (isBasementRoute && !isBasementScene) ||
        (isSystemsRoute && isBasementScene);
      card.classList.toggle("route-hidden", shouldHide);
      card.hidden = shouldHide;
      card.style.display = shouldHide ? "none" : "";
    });
    navLinks.forEach((link) => {
      const key = link.getAttribute("href")?.replace("#", "");
      const aliasPage = key ? routeAliases[key] : null;
      const isActive =
        key === page ||
        aliasPage === page ||
        (page === "home" && key === "landing") ||
        (page === "philosophy" && key === "philosophy") ||
        (page === "dimensions" && key === "philosophy");
      link.classList.toggle("is-active", isActive);
      link.setAttribute("aria-current", isActive ? "page" : "false");
    });
    refreshRouteTypography();
    const directHashTarget = document.getElementById(raw);
    const isDirectSectionTarget = activeIds.has(raw);
    const isPageRoute = raw === page || Boolean(pageRoutes[raw]) || Boolean(routeAliases[raw]);
    const isCanonicalPageRoute = raw === page;
    const targetId = isCanonicalPageRoute
      ? routeScrollTargets[page] || activeIds.values().next().value
      : directHashTarget && routeAliases[raw] === page
      ? raw
      : isDirectSectionTarget
      ? raw
      : isPageRoute
        ? routeScrollTargets[page] || activeIds.values().next().value
        : routeScrollTargets[page] || activeIds.values().next().value;
    const target = document.getElementById(targetId);
    if (target) {
      const alignPageTop = page === "home" && (raw === "home" || raw === "landing");
      const runScroll = () => scrollToRouteTarget(target, { alignPageTop });
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          runScroll();
          if (page === "basement-system") {
            window.setTimeout(runScroll, 160);
          }
        })
      );
    }
    window.dispatchEvent(new CustomEvent("zf:routechange", { detail: { page, raw } }));
  };

  window.addEventListener("hashchange", applyRoute);
  window.addEventListener("popstate", applyRoute);
  window.addEventListener("load", applyRoute, { once: true });
  applyRoute();
};

const basementAlertContent = {
  damp: {
    kicker: "Signal · Damp Load",
    title: "潮不是看见了水，而是材料和表面已经长期背着湿负荷。",
    science:
      "当地下室表面温度偏低，而空气里的水汽负担始终偏高时，墙面、地面、柜体背后与软装附近就会慢慢进入持续吸湿的状态。即使没有明显水迹，空间也已经开始失去干爽感。",
    harm: "饰面寿命下降、木作变形、织物返潮，空间会一直带着一种散不掉的潮感。",
    solution: "先把空气含湿量与露点压回合理区间，再处理围护表面温度、送回风组织和排水细节，让材料脱离长期吸湿状态。"
  },
  wet: {
    kicker: "Signal · High Humidity",
    title: "湿不是主观觉得难受，而是空气里真的带着过多的水。",
    science:
      "当地下室空气含湿量高、换气不足、除湿响应慢时，水汽负担就会一直留在空间里。身体会先感到黏、重、闷，材料也会跟着进入高湿环境。",
    harm: "皮肤发黏、织物发软、储物受潮、器材金属件更容易氧化，久留会让人本能地想离开地下室。",
    solution: "通过稳定除湿、送回风联动与新风控制，把空气中的含湿量压回合理区间，而不是只把温度暂时压低。 ",
  },
  seepage: {
    kicker: "Signal · Seepage",
    title: "渗水不是一处表面问题，而是水沿着结构和节点找到了路。",
    science:
      "当地下围护结构外侧水压、节点构造、穿墙套管或施工细节处理不完整时，水就会沿最薄弱的路径慢慢进入室内，形成持续渗漏或反复返湿。",
    harm: "墙脚发花、饰面起鼓、设备间受损、柜体底部霉烂，整层地下空间会逐渐失去被信任的基础。",
    solution: "从结构防水、节点封闭、排水导流和检修可达性这几层一起处理，而不是只在表面补一道材料。"
  },
  stuffy: {
    kicker: "Signal · Stuffy Air",
    title: "闷不是因为没有开窗，而是空气没有被持续更新。",
    science:
      "当地下室送风不足、回风路径不完整、局部死角过多时，人体周围的空气更新就会变慢，CO2、气味和湿感都会在停留区堆积。",
    harm: "人会觉得压、重、不透气，久坐、观影和会客都会更容易疲倦，空间再漂亮也很难真正轻松。",
    solution: "把送回风路径、换气量分配、末端布点与低速持续运行一起建立起来，让停留区始终有被更新的空气。"
  },
  mold: {
    kicker: "Signal · Mold",
    title: "发霉不是某一种材料的问题，而是湿负荷长期失控后的结果。",
    science:
      "当表面长期潮湿、空气更新缓慢、角落温差偏大时，霉菌会优先在柜后、墙角、软包、织物和吸湿材料表面定殖。",
    harm: "气味会变差，材料会老化，清洁成本会上升，严重时连呼吸舒适与收藏保存也会被一起牵动。",
    solution: "降低露点风险、提高干燥速度、减少滞留死角，并让材料表面重新回到长期可恢复的干爽状态。"
  },
  odor: {
    kicker: "Signal · Odor",
    title: "异味往往不是一个点的问题，而是空气组织失衡后的综合结果。",
    science:
      "当地下室排风路径模糊、局部潮湿、排水系统水封与通气不稳定时，气味就会在低位空间缓慢堆积，并不断回流到其他区域。",
    harm: "茶水区、卫生间、储物区和软装会互相串味，让空间失去干净感，也让人对地下室天然产生排斥。",
    solution: "把排风、排水水封、空气分区与压力控制一起建立起来，而不是只靠香氛去覆盖。"
  },
  radon: {
    kicker: "Signal · Radon",
    title: "氡气是地下空间必须正视的隐性风险，它看不见，却必须被管理。",
    science:
      "氡来自土壤与岩层释放，在地下空间更容易积聚。若底板、缝隙与通风组织不完善，低位区域的浓度就更可能持续抬高。",
    harm: "它不会立刻让人感觉不适，但长期累积风险不能忽视，所以真正专业的地下空间必须把它当成真实参数管理。",
    solution: "通过底部封闭、缝隙控制、持续换气与必要的监测预留，让地下空间具备长期可验证的安全边界。"
  },
  co2: {
    kicker: "Signal · CO2 Load",
    title: "CO2 升高，意味着人在空间里待得越久，空气就越容易失去轻松感。",
    science:
      "当地下室停留人数增加、换气量偏低、回风路径不顺畅时，二氧化碳浓度会比地上空间更快抬高，尤其是在影音室与会客区。",
    harm: "人会更快疲倦、注意力下降、体感发沉，空间看起来很好，但身体并不会觉得轻松。",
    solution: "让新风量、回风量和真实人数场景匹配起来，并把常用停留区的空气更新速度作为设计重点。"
  }
};

const initBasementAlerts = () => {
  const scope = document.getElementById("basement-problem-signals");
  if (!scope) return;

  const buttons = Array.from(scope.querySelectorAll("[data-basement-topic]"));
  const kicker = scope.querySelector("[data-basement-kicker]");
  const title = scope.querySelector("[data-basement-title]");
  const science = scope.querySelector("[data-basement-science]");
  const harm = scope.querySelector("[data-basement-harm]");
  const solution = scope.querySelector("[data-basement-solution]");
  if (!buttons.length || !kicker || !title || !science || !harm || !solution) return;

  const renderTopic = (topicKey) => {
    const content = basementAlertContent[topicKey];
    if (!content) return;
    buttons.forEach((button) => {
      const active = button.dataset.basementTopic === topicKey;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    kicker.textContent = content.kicker;
    title.textContent = content.title;
    science.textContent = content.science;
    harm.textContent = content.harm;
    solution.textContent = content.solution;
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => renderTopic(button.dataset.basementTopic));
  });

  renderTopic("damp");
};

const initBasementJourney = () => {
  const buttons = Array.from(document.querySelectorAll("[data-basement-journey]"));
  const panels = Array.from(document.querySelectorAll("[data-basement-journey-panel]"));
  if (!buttons.length || !panels.length) return;

  const renderPanel = (key) => {
    buttons.forEach((button) => {
      const active = button.dataset.basementJourney === key;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", active ? "true" : "false");
      button.setAttribute("aria-expanded", active ? "true" : "false");
    });

    panels.forEach((panel) => {
      const active = panel.dataset.basementJourneyPanel === key;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });
  };

  const collapseAll = () => {
    buttons.forEach((button) => {
      button.classList.remove("is-active");
      button.setAttribute("aria-selected", "false");
      button.setAttribute("aria-expanded", "false");
    });

    panels.forEach((panel) => {
      panel.classList.remove("is-active");
      panel.hidden = true;
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const isActive = button.classList.contains("is-active");
      if (isActive) {
        collapseAll();
        return;
      }
      renderPanel(button.dataset.basementJourney);
    });
  });

  collapseAll();
};

const initWaterJourney = () => {
  const buttons = Array.from(document.querySelectorAll("[data-water-journey]"));
  const panels = Array.from(document.querySelectorAll("[data-water-journey-panel]"));
  if (!buttons.length || !panels.length) return;

  const renderPanel = (key) => {
    buttons.forEach((button) => {
      const active = button.dataset.waterJourney === key;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", active ? "true" : "false");
      button.setAttribute("aria-expanded", active ? "true" : "false");
    });

    panels.forEach((panel) => {
      const active = panel.dataset.waterJourneyPanel === key;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });
  };

  const collapseAll = () => {
    buttons.forEach((button) => {
      button.classList.remove("is-active");
      button.setAttribute("aria-selected", "false");
      button.setAttribute("aria-expanded", "false");
    });

    panels.forEach((panel) => {
      panel.classList.remove("is-active");
      panel.hidden = true;
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const isActive = button.classList.contains("is-active");
      if (isActive) {
        collapseAll();
        return;
      }
      renderPanel(button.dataset.waterJourney);
    });
  });

  collapseAll();
};

const initBasementSimulator = () => {
  const simulatorSection = document.getElementById("basement-environment-simulator");
  const entryButtons = Array.from(document.querySelectorAll("[data-basement-sim-entry], [data-basement-sim-entry-inline]"));
  const primaryEntryButton = entryButtons[0];
  const simulator = document.querySelector("[data-basement-simulator]");
  if (!simulatorSection || !primaryEntryButton || !simulator) return;

  const scrollToSimulator = () => {
    const headerOffset = window.matchMedia("(max-width: 900px)").matches ? 72 : 82;
    const simulatorTop = simulator.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({
      top: Math.max(0, simulatorTop),
      behavior: "smooth"
    });
  };

  const openSimulator = () => {
    simulatorSection.hidden = false;
    simulatorSection.classList.remove("route-hidden");
    simulatorSection.style.display = "";
    simulatorSection.dataset.simulatorOpen = "true";
    entryButtons.forEach((button) => button.setAttribute("aria-expanded", "true"));
    requestAnimationFrame(() => {
      scrollToSimulator();
      window.setTimeout(scrollToSimulator, 120);
    });
  };

  entryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const alreadyOpen = simulatorSection.dataset.simulatorOpen === "true";
      if (!alreadyOpen) {
        openSimulator();
        return;
      }
      scrollToSimulator();
    });
  });

  const launchButton = simulator.querySelector("[data-sim-launch]");
  const backButton = simulator.querySelector("[data-sim-back]");
  const progress = simulator.querySelector("[data-sim-progress]");
  const kicker = simulator.querySelector("[data-sim-kicker]");
  const title = simulator.querySelector("[data-sim-title]");
  const text = simulator.querySelector("[data-sim-text]");
  const panelState = simulator.querySelector("[data-sim-panel-state]");
  const metricNodes = Array.from(simulator.querySelectorAll("[data-sim-metric]"));
  if (
    !launchButton ||
    !backButton ||
    !progress ||
    !kicker ||
    !title ||
    !text
  ) return;

  const stateCopy = {
    before: {
      kicker: "Before · 环境失衡",
      title: "地下室还没有回到自然舒适的状态。",
      text: "湿气、露点与空气停滞正在悄悄积累，空间还带着明显的地下感。",
      progress: "等待系统介入",
      panel: "失衡",
      tone: "danger",
      metrics: { rh: ["88%", "88%"], temp: ["28.6°C", "76%"], co2: ["1450 ppm", "82%"], pm25: ["48 μg/m³", "72%"], radon: ["142 Bq/m³", "68%"] }
    },
    detect: {
      kicker: "Step 1 · 环境识别",
      title: "系统正在识别湿气、露点与空气路径。",
      text: "先把看不见的湿负荷、空气滞留和低位气体问题显影出来。",
      progress: "环境识别中",
      panel: "诊断",
      tone: "danger",
      metrics: { rh: ["82%", "82%"], temp: ["27.2°C", "70%"], co2: ["1260 ppm", "72%"], pm25: ["36 μg/m³", "62%"], radon: ["128 Bq/m³", "60%"] }
    },
    intervene: {
      kicker: "Step 2 · 系统介入",
      title: "空气开始交换，湿负荷被带离空间。",
      text: "送风、回风、除湿与排风协同工作，空间不再只靠自然渗透。",
      progress: "系统介入中",
      panel: "改善",
      tone: "warning",
      metrics: { rh: ["66%", "58%"], temp: ["25.4°C", "52%"], co2: ["980 ppm", "48%"], pm25: ["18 μg/m³", "38%"], radon: ["96 Bq/m³", "42%"] }
    },
    balance: {
      kicker: "Step 3 · 渐趋稳定",
      title: "参数回到舒适区，地下感慢慢退后。",
      text: "湿度、温度、空气洁净度和低位气体浓度同时向目标区间收敛。",
      progress: "状态回稳中",
      panel: "稳定",
      tone: "ok",
      metrics: { rh: ["56%", "34%"], temp: ["23.8°C", "30%"], co2: ["760 ppm", "28%"], pm25: ["8 μg/m³", "18%"], radon: ["58 Bq/m³", "22%"] }
    },
    stable: {
      kicker: "After · 环境恢复",
      title: "空间重新回到安静、自然、可长期停留的状态。",
      text: "",
      progress: "",
      panel: "正常",
      tone: "ok",
      metrics: { rh: ["52%", "26%"], temp: ["23.5°C", "26%"], co2: ["690 ppm", "22%"], pm25: ["5 μg/m³", "12%"], radon: ["42 Bq/m³", "16%"] }
    }
  };

  let timers = [];
  let currentState = "before";

  const clearTimers = () => {
    timers.forEach((timer) => window.clearTimeout(timer));
    timers = [];
  };

  const renderState = (stateKey) => {
    currentState = stateKey;
    simulator.dataset.state = stateKey;
    const copy = stateCopy[stateKey];
    if (copy) {
      kicker.textContent = copy.kicker;
      title.textContent = copy.title;
      text.textContent = copy.text;
      progress.textContent = copy.progress;
      if (panelState) panelState.textContent = copy.panel;
      simulator.dataset.tone = copy.tone;
      metricNodes.forEach((node) => {
        const key = node.dataset.simMetric;
        const next = copy.metrics?.[key];
        if (!next) return;
        const value = node.querySelector("[data-sim-value]");
        if (value) value.textContent = next[0];
        node.style.setProperty("--meter", next[1]);
      });
    }
    launchButton.hidden = stateKey === "stable";
    progress.hidden = stateKey === "stable";
    backButton.hidden = stateKey !== "stable";
  };

  const runSimulation = () => {
    clearTimers();
    launchButton.disabled = true;
    renderState("detect");
    timers.push(window.setTimeout(() => renderState("intervene"), 4200));
    timers.push(window.setTimeout(() => renderState("balance"), 9000));
    timers.push(window.setTimeout(() => renderState("stable"), 14500));
    timers.push(window.setTimeout(() => {
      launchButton.disabled = false;
    }, 18600));
  };

  launchButton.addEventListener("click", () => {
    runSimulation();
  });

  backButton.addEventListener("click", () => {
    clearTimers();
    simulatorSection.hidden = true;
    simulatorSection.style.display = "none";
    simulatorSection.dataset.simulatorOpen = "false";
    entryButtons.forEach((button) => button.setAttribute("aria-expanded", "false"));
    renderState("before");
    launchButton.disabled = false;
    const definitionTop = document.getElementById("basement-definition")?.getBoundingClientRect().top;
    if (typeof definitionTop === "number") {
      const headerOffset = window.matchMedia("(max-width: 900px)").matches ? 72 : 82;
      window.scrollTo({
        top: Math.max(0, definitionTop + window.scrollY - headerOffset),
        behavior: "smooth"
      });
    }
  });

  simulatorSection.hidden = true;
  simulatorSection.style.display = "none";
  simulatorSection.dataset.simulatorOpen = "false";
  entryButtons.forEach((button) => button.setAttribute("aria-expanded", "false"));
  renderState("before");
  launchButton.disabled = false;
};

const initWaterSimulator = () => {
  const entryButtons = Array.from(document.querySelectorAll('[data-water-sim-entry]'));
  const shell = document.getElementById('water-system-simulator');
  const stage = document.querySelector('[data-water-sim-stage]');
  if (!entryButtons.length || !shell || !stage) return;

  const sceneButtons = Array.from(document.querySelectorAll('[data-water-sim-scene]'));
  const launchButton = stage.querySelector('[data-water-sim-launch]');
  const image = stage.querySelector('[data-water-sim-image]');
  const panelKicker = stage.querySelector('[data-water-sim-panel-kicker]');
  const panelState = stage.querySelector('[data-water-sim-panel-state]');
  const reference = stage.querySelector('[data-water-sim-reference]');
  const kicker = stage.querySelector('[data-water-sim-kicker]');
  const title = stage.querySelector('[data-water-sim-title]');
  const text = stage.querySelector('[data-water-sim-text]');
  const progress = stage.querySelector('[data-water-sim-progress]');
  const metricNodes = Array.from(stage.querySelectorAll('[data-water-sim-metric]'));
  const riskNodes = Array.from(stage.querySelectorAll('[data-water-sim-risk]'));
  if (!launchButton || !image || !panelKicker || !panelState || !reference || !kicker || !title || !text || !progress || metricNodes.length !== 4 || riskNodes.length !== 3) return;

  const scenes = {
    purification: {
      panelKicker: 'Water Quality',
      image: 'images/generated-water-scenes/water-pipeline-dispenser.webp',
      alt: '高端住宅餐厨区净饮水场景，玻璃瓶接入稳定净饮水，柜体克制整洁',
      risks: ['浊度偏高', '余氯波动', '口感不稳'],
      reference: '饮用水浊度建议接近或低于 1 NTU，余氯与异味波动要在末端被明显收敛。',
      states: {
        before: {
          kicker: 'Before · 净水还没被组织',
          title: '入户水已经进来了，但水质体验还没有稳定下来。',
          text: '前置过滤、中央净水和末端体验之间还没有形成连续路径，参数容易在生活里直接被感知。',
          progress: '等待系统介入',
          panel: '失衡',
          tone: 'danger',
          metrics: [
            ['浊度 NTU', '2.4', '82%'],
            ['余氯', '0.62 mg/L', '76%'],
            ['异味等级', '明显', '70%'],
            ['滤芯状态', '未介入', '68%']
          ]
        },
        detect: {
          kicker: 'Step 1 · 识别来水状态',
          title: '系统先把悬浮物、余氯和口感波动分层识别出来。',
          text: '先区分大颗粒风险、异味来源和末端体验，再决定过滤路径的介入顺序。',
          progress: '识别来水中',
          panel: '诊断',
          tone: 'danger',
          metrics: [
            ['浊度 NTU', '1.9', '70%'],
            ['余氯', '0.48 mg/L', '64%'],
            ['异味等级', '可感知', '58%'],
            ['滤芯状态', '预处理启动', '54%']
          ]
        },
        intervene: {
          kicker: 'Step 2 · 分级过滤介入',
          title: '前置过滤和中央净水开始把水质波动带离生活末端。',
          text: '大颗粒先被拦截，余氯和异味被进一步削弱，末端出水开始变得更轻更顺。',
          progress: '系统介入中',
          panel: '改善',
          tone: 'warning',
          metrics: [
            ['浊度 NTU', '1.1', '46%'],
            ['余氯', '0.22 mg/L', '40%'],
            ['异味等级', '轻微', '34%'],
            ['滤芯状态', '工作中', '36%']
          ]
        },
        stable: {
          kicker: 'After · 末端稳定',
          title: '末端用水重新变清透，入口到龙头形成完整净水路径。',
          text: '现在更像一个被组织过的系统，而不是几件设备各自工作。',
          progress: '稳定完成',
          panel: '稳定',
          tone: 'ok',
          metrics: [
            ['浊度 NTU', '0.4', '18%'],
            ['余氯', '0.06 mg/L', '16%'],
            ['异味等级', '几乎无感', '12%'],
            ['滤芯状态', '稳定运行', '14%']
          ]
        }
      }
    },
    softwater: {
      panelKicker: 'Soft Water Balance',
      image: 'images/generated-water-scenes/water-soft-rain-shower.webp',
      alt: '高端住宅柔雨淋浴场景，细密水幕、温润材质和克制灯光形成放松的沐浴体验',
      risks: ['硬度偏高', '结垢累积', '触肤发涩'],
      reference: '软水更偏向生活体验优化，要看硬度下降、结垢风险收敛和再生状态是否稳定。',
      states: {
        before: {
          kicker: 'Before · 硬水直接进入生活',
          title: '花洒、玻璃、龙头和洗衣路径，还在承受明显的硬水负担。',
          text: '当硬度长期偏高时，结垢和触肤发涩不会一下子爆发，但会持续堆进日常体验里。',
          progress: '等待系统介入',
          panel: '失衡',
          tone: 'danger',
          metrics: [
            ['硬度', '285 ppm', '82%'],
            ['结垢风险', '偏高', '76%'],
            ['软水盐状态', '未介入', '68%'],
            ['再生周期', '无节奏', '72%']
          ]
        },
        detect: {
          kicker: 'Step 1 · 识别硬度负担',
          title: '系统先判断硬度水平、再生负荷和高频生活用水点。',
          text: '先看哪些地方最容易感到涩、白斑和积垢，再把软水介入的节奏定下来。',
          progress: '识别硬度中',
          panel: '诊断',
          tone: 'danger',
          metrics: [
            ['硬度', '240 ppm', '68%'],
            ['结垢风险', '可感知', '60%'],
            ['软水盐状态', '开始补给', '52%'],
            ['再生周期', '正在建立', '54%']
          ]
        },
        intervene: {
          kicker: 'Step 2 · 软化开始接管',
          title: '软水处理开始把硬度和结垢趋势从高频生活路径里拉下来。',
          text: '花洒、家务、洗衣和地暖补水的体验开始变得更顺，不再被水垢持续拖住。',
          progress: '软化介入中',
          panel: '改善',
          tone: 'warning',
          metrics: [
            ['硬度', '92 ppm', '34%'],
            ['结垢风险', '明显下降', '28%'],
            ['软水盐状态', '稳定工作', '24%'],
            ['再生周期', '72 h', '26%']
          ]
        },
        stable: {
          kicker: 'After · 触肤和用水体验更顺',
          title: '硬度被带回合理区间，软水开始服务体验而不是制造负担。',
          text: '这里强调的不是把所有水都变成越软越好，而是把该优化的生活路径稳定下来。',
          progress: '稳定完成',
          panel: '稳定',
          tone: 'ok',
          metrics: [
            ['硬度', '48 ppm', '16%'],
            ['结垢风险', '低', '12%'],
            ['软水盐状态', '在线', '10%'],
            ['再生周期', '自动维护', '12%']
          ]
        }
      }
    },
    ro: {
      panelKicker: 'RO Drinking Water',
      image: 'images/generated-air-scenes-v2/air-v2-kitchen-comfort.webp',
      alt: '高层住宅开放式厨房场景，岛台、烹饪与净饮关系清晰展开，空间通透而真实',
      risks: ['TDS 偏高', '口感波动', '流量不足'],
      reference: 'RO 纯水重点看 TDS 明显下降、口感稳定，以及末端流量和膜状态是否同步成立。',
      states: {
        before: {
          kicker: 'Before · 直饮端还不够稳定',
          title: '净饮路径已经存在，但口感、TDS 和出水节奏还没有真正被锁定。',
          text: '当 RO 膜状态和末端流量不稳定时，喝水、煲汤和茶饮会直接感受到波动。',
          progress: '等待系统介入',
          panel: '失衡',
          tone: 'danger',
          metrics: [
            ['TDS', '318 ppm', '86%'],
            ['RO 膜状态', '未进入稳定段', '74%'],
            ['纯废水比', '1 : 2.8', '66%'],
            ['末端流量', '0.7 L/min', '72%']
          ]
        },
        detect: {
          kicker: 'Step 1 · 识别纯水路径',
          title: '系统正在确认 RO 膜负荷、储水和即饮端的实际出水状态。',
          text: '先分清是膜效率、补水节奏还是末端流量在拖慢体验。',
          progress: '识别纯水中',
          panel: '诊断',
          tone: 'danger',
          metrics: [
            ['TDS', '172 ppm', '58%'],
            ['RO 膜状态', '开始校正', '56%'],
            ['纯废水比', '1 : 2.1', '48%'],
            ['末端流量', '1.1 L/min', '50%']
          ]
        },
        intervene: {
          kicker: 'Step 2 · 纯水开始稳定',
          title: 'RO 膜和末端供水开始把直饮口感拉回更稳定的状态。',
          text: '出水更干净，口感不再忽上忽下，厨房的饮水和烹饪节奏也变得更从容。',
          progress: '纯水回稳中',
          panel: '改善',
          tone: 'warning',
          metrics: [
            ['TDS', '48 ppm', '24%'],
            ['RO 膜状态', '稳定过滤', '22%'],
            ['纯废水比', '1 : 1.4', '20%'],
            ['末端流量', '1.7 L/min', '18%']
          ]
        },
        stable: {
          kicker: 'After · 直饮端进入稳定口感',
          title: 'RO 纯水不只是更低的数值，而是日常入口体验终于稳定下来。',
          text: '饮水、咖啡、茶饮和煲汤开始共享同一条更可靠的纯水路径。',
          progress: '稳定完成',
          panel: '稳定',
          tone: 'ok',
          metrics: [
            ['TDS', '26 ppm', '10%'],
            ['RO 膜状态', '在线', '8%'],
            ['纯废水比', '1 : 1.1', '8%'],
            ['末端流量', '2.0 L/min', '8%']
          ]
        }
      }
    },
    freshwater: {
      panelKicker: 'Fresh Loop Update',
      image: 'images/generated-water-scenes/water-fresh-loop-v3.webp',
      alt: '高端住宅鲜活水循环场景，清晨单人自然接水，龙头出水清澈，空间清爽明亮',
      risks: ['滞水偏久', '低频点沉默', '更新不足'],
      reference: '鲜活水重点看滞水时间下降、低频点活跃度提升，以及自动冲洗是否真的代替人工放水。',
      states: {
        before: {
          kicker: 'Before · 低频水点正在变旧',
          title: '客卫、吧台和地下室水点长期不用后，水还停在原地。',
          text: '如果每次都靠人手动放水，低频点位的卫生和使用体验就很难真正稳定。',
          progress: '等待系统介入',
          panel: '失衡',
          tone: 'danger',
          metrics: [
            ['滞水时长', '63 h', '84%'],
            ['水点活跃度', '低', '76%'],
            ['自动冲洗', '未启动', '68%'],
            ['末端更新状态', '停滞', '74%']
          ]
        },
        detect: {
          kicker: 'Step 1 · 识别低频点位',
          title: '系统先识别哪些水点长期沉默，哪些支路最容易产生滞水。',
          text: '不是每个点位都要同样更新，而是先把最容易被遗忘的地方找出来。',
          progress: '识别低频点中',
          panel: '诊断',
          tone: 'danger',
          metrics: [
            ['滞水时长', '39 h', '60%'],
            ['水点活跃度', '开始唤醒', '52%'],
            ['自动冲洗', '倒计时建立', '48%'],
            ['末端更新状态', '准备更新', '54%']
          ]
        },
        intervene: {
          kicker: 'Step 2 · 循环与冲洗介入',
          title: '自动冲洗和末端更新开始替代每天手动放水。',
          text: '低频点位重新被纳入系统节奏，鲜活水不再只发生在最常用的地方。',
          progress: '鲜活更新中',
          panel: '改善',
          tone: 'warning',
          metrics: [
            ['滞水时长', '8 h', '24%'],
            ['水点活跃度', '回升', '20%'],
            ['自动冲洗', '12 min', '18%'],
            ['末端更新状态', '进行中', '16%']
          ]
        },
        stable: {
          kicker: 'After · 低频点也保持鲜活',
          title: '现在连最少使用的水点，也在被系统悄悄维护。',
          text: '鲜活水不再依赖记忆，而是变成系统持续在后台完成的动作。',
          progress: '稳定完成',
          panel: '稳定',
          tone: 'ok',
          metrics: [
            ['滞水时长', '1.5 h', '8%'],
            ['水点活跃度', '正常', '8%'],
            ['自动冲洗', '自动维护', '6%'],
            ['末端更新状态', '完成', '6%']
          ]
        }
      }
    },
    hotwater: {
      panelKicker: 'Hot Water Loop',
      image: 'images/scene-rain-shower.webp',
      alt: '高端住宅雨淋花洒沐浴场景，水幕细密稳定，空间安静放松',
      risks: ['等待过长', '温度波动', '回水失联'],
      reference: '热水更重要的是等待时间缩短、温度波动减小，让远端点位也能稳定进入舒适区。',
      states: {
        before: {
          kicker: 'Before · 热水仍在等待里',
          title: '远端花洒和厨房热水点位，还在把等待和忽冷忽热留给使用者。',
          text: '回水没有真正形成节奏之前，热水只能靠放掉前段冷水去换取稳定。',
          progress: '等待系统介入',
          panel: '失衡',
          tone: 'danger',
          metrics: [
            ['等待时间', '32 s', '84%'],
            ['出水温度', '34.8 C', '74%'],
            ['回水状态', '未建立', '72%'],
            ['温差波动', '+/- 4.8 C', '78%']
          ]
        },
        detect: {
          kicker: 'Step 1 · 识别远端路径',
          title: '系统正在确认热水主回路、远端点位和当前温度衰减。',
          text: '先把等待发生在哪里看清楚，再决定回水与控制要如何同步。',
          progress: '识别热水路径中',
          panel: '诊断',
          tone: 'danger',
          metrics: [
            ['等待时间', '24 s', '70%'],
            ['出水温度', '37.6 C', '62%'],
            ['回水状态', '正在闭合', '58%'],
            ['温差波动', '+/- 3.2 C', '60%']
          ]
        },
        intervene: {
          kicker: 'Step 2 · 循环开始建立',
          title: '热水循环与控制开始介入，温度正在回到更接近使用者的地方。',
          text: '回水建立后，远端等待明显缩短，小流量和正常淋浴的温度波动也开始收敛。',
          progress: '热水回稳中',
          panel: '改善',
          tone: 'warning',
          metrics: [
            ['等待时间', '11 s', '38%'],
            ['出水温度', '40.5 C', '30%'],
            ['回水状态', '持续回路', '28%'],
            ['温差波动', '+/- 1.4 C', '26%']
          ]
        },
        stable: {
          kicker: 'After · 热水到达就位',
          title: '热水不再靠等待证明自己，而是更快、更稳地直接到达。',
          text: '沐浴、洗手和厨房热水都被同一条稳定回路接住。',
          progress: '稳定完成',
          panel: '稳定',
          tone: 'ok',
          metrics: [
            ['等待时间', '6 s', '16%'],
            ['出水温度', '41.2 C', '12%'],
            ['回水状态', '稳定在线', '10%'],
            ['温差波动', '+/- 0.6 C', '8%']
          ]
        }
      }
    },
    booster: {
      panelKicker: 'Pressure Stability',
      image: 'images/generated-water-scenes/water-balanced-points-v2.webp',
      alt: '高端住宅多点同时用水场景，厨房备餐与日常取水并行发生，流量与压力保持稳定',
      risks: ['入户压低', '末端掉压', '多点抢水'],
      reference: '增压不是越大越好，而是让入户压力、末端压力和波动幅度一起进入合理区间。',
      states: {
        before: {
          kicker: 'Before · 多点一开就开始抢水',
          title: '高层或远端点位的压力不足，正在把全家的用水体验拉散。',
          text: '厨房、花洒和台盆一旦同时开启，水量和体感就会立刻互相牵扯。',
          progress: '等待系统介入',
          panel: '失衡',
          tone: 'danger',
          metrics: [
            ['入户压力', '0.16 MPa', '82%'],
            ['末端压力', '0.11 MPa', '86%'],
            ['泵频率', '未稳定', '68%'],
            ['压力波动', '+/- 0.09 MPa', '78%']
          ]
        },
        detect: {
          kicker: 'Step 1 · 识别压损路径',
          title: '系统正在确认入户压力、远端压损和同时用水时的波动来源。',
          text: '先分清是高度、管径、阀件还是多点同时使用把问题放大。',
          progress: '识别压力中',
          panel: '诊断',
          tone: 'danger',
          metrics: [
            ['入户压力', '0.19 MPa', '66%'],
            ['末端压力', '0.16 MPa', '62%'],
            ['泵频率', '开始联动', '54%'],
            ['压力波动', '+/- 0.05 MPa', '56%']
          ]
        },
        intervene: {
          kicker: 'Step 2 · 增压开始平衡',
          title: '增压和流量分配开始把远端和多点同时用水拉回更平稳的区间。',
          text: '不是单纯把压力抬高，而是让关键末端在多人同时使用时也不至于失真。',
          progress: '压力回稳中',
          panel: '改善',
          tone: 'warning',
          metrics: [
            ['入户压力', '0.24 MPa', '34%'],
            ['末端压力', '0.23 MPa', '28%'],
            ['泵频率', '42 Hz', '24%'],
            ['压力波动', '+/- 0.02 MPa', '22%']
          ]
        },
        stable: {
          kicker: 'After · 多点同时用水也更从容',
          title: '压力终于回到合理区间，远端和高频点位都能被更稳定地接住。',
          text: '现在的增压更像秩序，而不是单纯更猛的水。',
          progress: '稳定完成',
          panel: '稳定',
          tone: 'ok',
          metrics: [
            ['入户压力', '0.28 MPa', '12%'],
            ['末端压力', '0.27 MPa', '10%'],
            ['泵频率', '36 Hz', '10%'],
            ['压力波动', '+/- 0.01 MPa', '8%']
          ]
        }
      }
    },
    sterile: {
      panelKicker: 'Stable Hot Water',
      image: 'images/scene-rain-shower.webp',
      alt: '高端住宅生活热水稳定场景，卫浴热水响应自然到位，空间安静放松',
      risks: ['等待过长', '温度波动', '末端保护不足'],
      reference: '生活热水更重要的是等待缩短、温度稳定、末端安全，让厨房与卫浴都能顺手进入舒适区。',
      states: {
        before: {
          kicker: 'Before · 热水还停在等待里',
          title: '热水回路还没有把等待时间、温度稳定和末端安全一起组织起来。',
          text: '真正让人不舒服的，不只是温度不够，而是等待过长、忽冷忽热和使用边界不清楚。',
          progress: '等待系统介入',
          panel: '失衡',
          tone: 'danger',
          metrics: [
            ['等待时间', '28 s', '76%'],
            ['出水温度', '36.2 C', '68%'],
            ['温差波动', '+/- 4.2 C', '72%'],
            ['末端保护', '未建立', '70%']
          ]
        },
        detect: {
          kicker: 'Step 1 · 识别热水路径',
          title: '系统正在确认回路长度、远端衰减和当前末端保护状态。',
          text: '先看等待发生在哪里、哪些点位最容易掉温，再决定循环与控制如何同步。',
          progress: '识别热水回路中',
          panel: '诊断',
          tone: 'danger',
          metrics: [
            ['等待时间', '20 s', '58%'],
            ['出水温度', '38.4 C', '54%'],
            ['温差波动', '+/- 2.8 C', '52%'],
            ['末端保护', '开始联动', '48%']
          ]
        },
        intervene: {
          kicker: 'Step 2 · 循环与控制开始回稳',
          title: '热水循环、温控和末端保护开始一起工作。',
          text: '现在的改善不是一味升温，而是让热水更快到位、温度更稳，同时把使用安全接住。',
          progress: '热水回稳中',
          panel: '改善',
          tone: 'warning',
          metrics: [
            ['等待时间', '9 s', '24%'],
            ['出水温度', '40.8 C', '22%'],
            ['温差波动', '+/- 1.2 C', '18%'],
            ['末端保护', '在线', '16%']
          ]
        },
        stable: {
          kicker: 'After · 热水稳定到位',
          title: '系统已经把等待、温度波动和末端安全一起收进稳定区。',
          text: '这时候的生活热水更像一种秩序: 厨房、洗手和沐浴都能顺手进入舒适状态。',
          progress: '稳定完成',
          panel: '稳定',
          tone: 'ok',
          metrics: [
            ['等待时间', '5 s', '10%'],
            ['出水温度', '41.3 C', '8%'],
            ['温差波动', '+/- 0.5 C', '6%'],
            ['末端保护', '稳定开启', '6%']
          ]
        }
      }
    },
    sewage: {
      panelKicker: 'Sewage Lifting',
      image: 'images/water-laundry-room-wide-v2.webp',
      alt: '高端住宅洗衣与家务用水场景，空间明亮克制，适合作为住宅排水与提升组织的代表画面',
      risks: ['液位积压', '止回缺位', '倒灌预警弱'],
      reference: '污水提升重点看液位、泵启停、止回和报警是否能把地下或低位排水真正组织起来。',
      states: {
        before: {
          kicker: 'Before · 低位排水还在等待重力帮忙',
          title: '当地下空间无法自然重力排走时，污水还在低位滞留。',
          text: '真正的风险不只是排得慢，而是液位、倒灌和报警都还没有被系统接住。',
          progress: '等待系统介入',
          panel: '失衡',
          tone: 'danger',
          metrics: [
            ['液位', '78%', '82%'],
            ['提升泵状态', '未启动', '74%'],
            ['止回状态', '不稳定', '70%'],
            ['报警状态', '未联动', '72%']
          ]
        },
        detect: {
          kicker: 'Step 1 · 识别低位排放',
          title: '系统正在确认启动液位、低位积水和止回边界。',
          text: '先看风险会在哪个阈值被触发，再决定提升与止回要怎样配合。',
          progress: '识别液位中',
          panel: '诊断',
          tone: 'danger',
          metrics: [
            ['液位', '64%', '60%'],
            ['提升泵状态', '待启动', '58%'],
            ['止回状态', '开始闭合', '54%'],
            ['报警状态', '预警建立', '50%']
          ]
        },
        intervene: {
          kicker: 'Step 2 · 提升开始接管',
          title: '液位到达启动点后，提升、止回和预警开始一起工作。',
          text: '这时候系统处理的不只是排走，而是把低位排放重新变成一个可控动作。',
          progress: '提升排放中',
          panel: '改善',
          tone: 'warning',
          metrics: [
            ['液位', '32%', '24%'],
            ['提升泵状态', '运行中', '22%'],
            ['止回状态', '稳定关闭', '18%'],
            ['报警状态', '在线', '16%']
          ]
        },
        stable: {
          kicker: 'After · 低位排水重新可控',
          title: '污水已经能被及时提升排走，倒灌和异常也更容易被提前发现。',
          text: '现在这个低位空间终于有了主动排放的能力，而不是被动等待。',
          progress: '稳定完成',
          panel: '稳定',
          tone: 'ok',
          metrics: [
            ['液位', '12%', '10%'],
            ['提升泵状态', '待机正常', '8%'],
            ['止回状态', '正常', '6%'],
            ['报警状态', '已就位', '6%']
          ]
        }
      }
    },
    rainwater: {
      panelKicker: 'Rainwater Lifting',
      image: 'images/generated-water-scenes/water-garden-irrigation.webp',
      alt: '高端别墅庭院夜间自动浇灌场景，低位灯光克制，植物与水流保持柔和稳定',
      risks: ['集水坑抬升', '雨强放大', '溢流风险'],
      reference: '雨水提升关注的是雨夜安全：先收集、再提升、再排走，让下沉空间不被积水接管。',
      states: {
        before: {
          kicker: 'Before · 雨水正在下沉空间里积起来',
          title: '下沉庭院或低位外侧还没有形成完整的雨水收集和提升路径。',
          text: '风险不是戏剧化的灾难感，而是雨一大就让低位空间失去安全边界。',
          progress: '等待系统介入',
          panel: '失衡',
          tone: 'danger',
          metrics: [
            ['集水坑液位', '72%', '80%'],
            ['雨强', '46 mm/h', '74%'],
            ['提升泵状态', '未进入节奏', '70%'],
            ['溢流风险', '偏高', '76%']
          ]
        },
        detect: {
          kicker: 'Step 1 · 识别雨水负荷',
          title: '系统正在确认集水速度、液位阈值和当前雨强。',
          text: '先分清是收集不足、提升滞后还是雨强突然放大，才能把安全边界找回来。',
          progress: '识别雨水中',
          panel: '诊断',
          tone: 'danger',
          metrics: [
            ['集水坑液位', '58%', '62%'],
            ['雨强', '38 mm/h', '58%'],
            ['提升泵状态', '准备启动', '54%'],
            ['溢流风险', '可感知', '56%']
          ]
        },
        intervene: {
          kicker: 'Step 2 · 雨水提升开始介入',
          title: '收集、启泵和提升排放开始一起工作，把雨夜风险往后推。',
          text: '现在系统处理的不只是眼前的水位，而是整段雨夜里的安全连续性。',
          progress: '雨水排放中',
          panel: '改善',
          tone: 'warning',
          metrics: [
            ['集水坑液位', '28%', '26%'],
            ['雨强', '34 mm/h', '34%'],
            ['提升泵状态', '运行中', '18%'],
            ['溢流风险', '低', '16%']
          ]
        },
        stable: {
          kicker: 'After · 雨夜边界重新稳定',
          title: '雨水已经能被及时收集并提升排走，下沉空间重新回到安全状态。',
          text: '这时候留下来的不是紧张感，而是雨夜也仍然可控的生活边界。',
          progress: '稳定完成',
          panel: '稳定',
          tone: 'ok',
          metrics: [
            ['集水坑液位', '10%', '8%'],
            ['雨强', '22 mm/h', '20%'],
            ['提升泵状态', '待机正常', '8%'],
            ['溢流风险', '很低', '6%']
          ]
        }
      }
    },
    drainage: {
      panelKicker: 'Drainage Defense',
      image: 'images/generated-water-scenes/water-silent-drainage-night.webp',
      alt: '夜间住宅洗衣与卫生间静音排水场景，家人附近安睡，排水系统安静运行',
      risks: ['水封偏低', '负压回吸', '异味回流'],
      reference: '防臭不是香氛遮味，而是水封、通气、排水路径和低频点位维护一起成立。',
      states: {
        before: {
          kicker: 'Before · 排水能走，但气味也可能回来',
          title: '低频水点和夜间排水还没有被真正组织成一条安静、防臭的路径。',
          text: '当水封衰减、通气不稳、排水负压出现时，异味和回声会先在生活里暴露出来。',
          progress: '等待系统介入',
          panel: '失衡',
          tone: 'danger',
          metrics: [
            ['水封高度', '18 mm', '86%'],
            ['管道负压', '-310 Pa', '78%'],
            ['通气状态', '不稳定', '72%'],
            ['异味风险', '偏高', '74%']
          ]
        },
        detect: {
          kicker: 'Step 1 · 识别回流条件',
          title: '系统正在确认是水封变浅、通气不足，还是低频点位长期滞留。',
          text: '先把异味为何会回来识别清楚，再让维护动作更精准。',
          progress: '识别排水路径中',
          panel: '诊断',
          tone: 'danger',
          metrics: [
            ['水封高度', '24 mm', '68%'],
            ['管道负压', '-220 Pa', '60%'],
            ['通气状态', '正在修正', '56%'],
            ['异味风险', '可感知', '58%']
          ]
        },
        intervene: {
          kicker: 'Step 2 · 通气与补水介入',
          title: '定时补水、排水通气和低频点位维护开始一起工作。',
          text: '排水路径被重新组织后，夜间使用和低频地漏都不再那么容易把气味带回室内。',
          progress: '系统介入中',
          panel: '改善',
          tone: 'warning',
          metrics: [
            ['水封高度', '38 mm', '34%'],
            ['管道负压', '-96 Pa', '30%'],
            ['通气状态', '连续稳定', '24%'],
            ['异味风险', '低', '22%']
          ]
        },
        stable: {
          kicker: 'After · 排水安静离开',
          title: '水封、通气和低频维护重新站到同一边，异味不再轻易回流。',
          text: '现在留下来的只有安静的排水动作，而不是它的副作用。',
          progress: '稳定完成',
          panel: '稳定',
          tone: 'ok',
          metrics: [
            ['水封高度', '52 mm', '12%'],
            ['管道负压', '-28 Pa', '10%'],
            ['通气状态', '正常', '8%'],
            ['异味风险', '很低', '6%']
          ]
        }
      }
    }
  };

  let timers = [];
  let currentScene = 'purification';

  const clearTimers = () => {
    timers.forEach((timer) => window.clearTimeout(timer));
    timers = [];
  };

  const scrollToSimulator = () => {
    const headerOffset = window.matchMedia('(max-width: 900px)').matches ? 72 : 82;
    const top = shell.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  };

  const openSimulator = () => {
    shell.hidden = false;
    shell.style.display = '';
    shell.dataset.simulatorOpen = 'true';
    entryButtons.forEach((button) => button.setAttribute('aria-expanded', 'true'));
    requestAnimationFrame(() => {
      scrollToSimulator();
      window.setTimeout(scrollToSimulator, 120);
    });
  };

  const renderState = (stateKey) => {
    const scene = scenes[currentScene];
    const copy = scene.states[stateKey];
    stage.dataset.waterSimScene = currentScene;
    stage.dataset.waterSimState = stateKey;
    stage.dataset.waterSimTone = copy.tone;
    image.src = scene.image;
    image.alt = scene.alt;
    panelKicker.textContent = scene.panelKicker;
    panelState.textContent = copy.panel;
    reference.textContent = scene.reference;
    kicker.textContent = copy.kicker;
    title.textContent = copy.title;
    text.textContent = copy.text;
    progress.textContent = copy.progress;
    riskNodes.forEach((node, index) => {
      const label = node.querySelector(`[data-water-sim-risk="${index}"]`);
      if (label) label.textContent = scene.risks[index] || '';
    });
    metricNodes.forEach((node, index) => {
      const metric = copy.metrics[index];
      if (!metric) return;
      const metricLabel = node.querySelector(`[data-water-sim-metric-label="${index}"]`);
      const metricValue = node.querySelector(`[data-water-sim-metric-value="${index}"]`);
      if (metricLabel) metricLabel.textContent = metric[0];
      if (metricValue) metricValue.textContent = metric[1];
      node.style.setProperty('--meter', metric[2]);
    });
  };

  const resetScene = (sceneKey) => {
    clearTimers();
    currentScene = sceneKey;
    launchButton.disabled = false;
    renderState('before');
    sceneButtons.forEach((button) => {
      const active = button.dataset.waterSimScene === sceneKey;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  };

  const runSimulation = () => {
    clearTimers();
    launchButton.disabled = true;
    renderState('detect');
    timers.push(window.setTimeout(() => renderState('intervene'), 3400));
    timers.push(window.setTimeout(() => renderState('stable'), 7600));
    timers.push(window.setTimeout(() => {
      launchButton.disabled = false;
    }, 8200));
  };

  entryButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const opened = shell.dataset.simulatorOpen === 'true';
      if (!opened) {
        openSimulator();
      } else {
        scrollToSimulator();
      }
    });
  });

  sceneButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const nextScene = button.dataset.waterSimScene;
      if (!nextScene || nextScene === currentScene) return;
      resetScene(nextScene);
    });
  });

  launchButton.addEventListener('click', runSimulation);

  shell.hidden = true;
  shell.style.display = 'none';
  shell.dataset.simulatorOpen = 'false';
  entryButtons.forEach((button) => button.setAttribute('aria-expanded', 'false'));
  resetScene('purification');
};

const dewPoint = (temperature, humidity) => {
  const a = 17.27;
  const b = 237.7;
  const alpha = ((a * temperature) / (b + temperature)) + Math.log(humidity / 100);
  return (b * alpha) / (a - alpha);
};

const saturationVaporPressure = (temperature) =>
  0.61078 * Math.exp((17.2694 * temperature) / (temperature + 237.29));

const psychrometricState = (temperature, humidity) => {
  const relativeHumidity = Math.min(100, Math.max(1, humidity));
  const vaporPressure = saturationVaporPressure(temperature) * (relativeHumidity / 100);
  const atmosphericPressure = 101.325;
  const humidityRatio = 0.62198 * vaporPressure / Math.max(0.1, atmosphericPressure - vaporPressure);
  const enthalpy = 1.006 * temperature + humidityRatio * (2501 + 1.86 * temperature);

  return {
    dew: dewPoint(temperature, relativeHumidity),
    humidityRatio: humidityRatio * 1000,
    enthalpy
  };
};

const dewStepFor = (dew) => dewSteps.find((step) => dew <= step.max) || dewSteps[dewSteps.length - 1];

const renderDewBar = (activeDew) => {
  const bar = $("[data-dewpoint-bar]");
  if (!bar) return;
  const active = dewStepFor(activeDew);
  bar.innerHTML = dewSteps
    .map(
      (step) => `
        <div class="dew-step ${step === active ? "is-active" : ""}">
          <b>${step.range} · ${step.label}</b>
          <span>${step.text}</span>
        </div>
      `
    )
    .join("");
};

const updateDewTool = () => {
  const tempInput = $("[data-temp]");
  const rhInput = $("[data-rh]");
  const dewInput = $("[data-dew-input]");
  if (!tempInput || !rhInput) return;
  const temp = Number(tempInput.value);
  const rh = Number(rhInput.value);
  if (![temp, rh].every(Number.isFinite) || rh <= 0 || rh > 100) return;
  const { dew, humidityRatio, enthalpy } = psychrometricState(temp, rh);
  const step = dewStepFor(dew);
  if (dewInput) dewInput.value = dew.toFixed(1);
  if ($("[data-weather-temp]")) $("[data-weather-temp]").textContent = temp.toFixed(1);
  if ($("[data-weather-rh]")) $("[data-weather-rh]").textContent = Math.round(rh).toString();
  $("[data-dew-value]").textContent = dew.toFixed(1);
  $("[data-humidity-ratio]").textContent = humidityRatio.toFixed(1);
  $("[data-enthalpy]").textContent = enthalpy.toFixed(1);
  $("[data-dew-label]").textContent = step.label;
  $("[data-dew-explain]").textContent =
    `${step.text} 当前空气含水量约 ${humidityRatio.toFixed(1)} g/kg，焓值约 ${enthalpy.toFixed(1)} kJ/kg，露点温度约 ${dew.toFixed(1)}℃。`;
  renderDewBar(dew);
};

const setWeatherStatus = (state, updatedTime = "") => {
  const status = $("[data-weather-status]");
  const statusText = $("[data-weather-status-text]");
  const updated = $("[data-weather-updated]");
  const heading = $("[data-weather-heading]");
  if (!status || !statusText || !updated || !heading) return;

  status.dataset.state = state;
  document.documentElement.dataset.weatherSource = state;

  if (state === "live") {
    heading.textContent = "今日气候（湖南长沙）";
    statusText.textContent = "实时数据";
    updated.textContent = updatedTime ? `更新 ${updatedTime}` : "刚刚更新";
    updated.dateTime = updatedTime || "";
    return;
  }

  if (state === "reference") {
    heading.textContent = "长沙气候参考（季节样本）";
    statusText.textContent = "实时气象暂不可用";
    updated.textContent = "当前为参考值";
    updated.removeAttribute("datetime");
    return;
  }

  heading.textContent = "今日气候（湖南长沙）";
  statusText.textContent = "正在连接实时气象";
  updated.textContent = "";
  updated.removeAttribute("datetime");
};

const initWeather = async () => {
  if (window.matchMedia("(max-width: 760px)").matches) {
    $(".dewpoint-calculator")?.removeAttribute("open");
  }
  setWeatherStatus("loading");
  updateDewTool();
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 8000);
  try {
    const forceReferenceForLocalQA =
      ["localhost", "127.0.0.1"].includes(window.location.hostname) &&
      new URLSearchParams(window.location.search).has("weather-reference-test");
    if (forceReferenceForLocalQA) throw new Error("local weather fallback test");
    const url = "https://api.open-meteo.com/v1/forecast?latitude=28.23&longitude=112.94&current=temperature_2m,relative_humidity_2m&timezone=Asia%2FShanghai";
    const response = await fetch(url, {
      signal: controller.signal,
      cache: "no-store"
    });
    if (!response.ok) throw new Error("weather unavailable");
    const data = await response.json();
    const temp = data.current?.temperature_2m;
    const rh = data.current?.relative_humidity_2m;
    if (typeof temp !== "number" || typeof rh !== "number") throw new Error("weather shape changed");
    $("[data-temp]").value = temp.toFixed(1);
    $("[data-rh]").value = Math.round(rh);
    if ($("[data-weather-value]")) {
      $("[data-weather-value]").textContent = `${temp.toFixed(1)}℃ · RH ${Math.round(rh)}%`;
    }
    updateDewTool();
    const updatedTime = typeof data.current?.time === "string"
      ? data.current.time.slice(11, 16)
      : new Intl.DateTimeFormat("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
    setWeatherStatus("live", updatedTime);
  } catch {
    $("[data-temp]").value = "29.8";
    $("[data-rh]").value = "78";
    if ($("[data-weather-value]")) {
      $("[data-weather-value]").textContent = "29.8℃ · RH 78%";
    }
    updateDewTool();
    setWeatherStatus("reference");
  } finally {
    window.clearTimeout(timeout);
  }
};

const navigationArchitecture = {
  philosophy: {
    kicker: "RESIDENTIAL MEP PHILOSOPHY",
    title: "住宅真正的品质，始于看不见的环境秩序",
    description: "从身体感受与长期居住出发，理解空气、水、光、声如何共同支撑住宅。",
    tone: "philosophy",
    guide: [
      ["#philosophy", "住宅与生命", "理解住宅机电为什么值得被认真对待"],
      ["#dimensions", "MEP 四维度", "从空气、水、光、声建立整体认知"]
    ],
    specialLabel: "专题规划",
    specials: [
      { title: "住宅机电价值", note: "理念专题", status: "foundation", href: "#philosophy" },
      { title: "住宅光环境", note: "光与昼夜节律", status: "foundation", href: "#dimensions" },
      { title: "住宅声环境", note: "安静与声学边界", status: "foundation", href: "#dimensions" }
    ]
  },
  air: {
    kicker: "INDOOR CLIMATE SYSTEM",
    title: "好空气，不只是一项设备功能",
    description: "温度、湿度、露点、洁净、含氧感与安静，需要被一套完整的空气逻辑共同组织。",
    tone: "air",
    guide: [
      ["#air", "空气系统总览", "从湖南气候进入住宅空气问题"],
      ["#environment-problem", "生活感受", "理解闷、黏、直吹、异味与噪声"],
      ["#environment-logic", "系统逻辑", "看空气如何被连续稳定地组织"],
      ["#systems", "应用场景", "查看住宅不同空间的运行状态"]
    ],
    specialLabel: "专业专栏",
    specials: [
      { title: "五恒住宅系统", note: "完整专题 · 已上线", status: "live", href: "five-constant-system/index.html" },
      { title: "DOAS 新风系统", note: "独立新风与潜热管理", status: "live", href: "air-doas/index.html" },
      { title: "露点控制", note: "冷表面与结露安全", status: "live", href: "air-dewpoint/index.html" },
      { title: "全屋新风系统", note: "房间空气更新专题", status: "live", href: "air-ventilation/index.html" }
    ]
  },
  basement: {
    kicker: "BASEMENT ENVIRONMENT",
    title: "让地下空间重新回到住宅状态",
    description: "防水、防潮、空气、温湿度、排水与围护边界共同成立，地下室才适合长期生活。",
    tone: "basement",
    guide: [
      ["#basement-system", "地下空间认知", "先理解地下室为什么容易失衡"],
      ["#basement-problem", "环境问题", "潮、霉、闷、异味与压迫感"],
      ["#basement-logic", "系统逻辑", "围护、空气、水汽和排水协同"],
      ["#basement-sport-layer", "生活场景", "运动、阅读、会客与收藏空间"]
    ],
    specialLabel: "专业专栏",
    specials: [
      { title: "污水与雨水提升", note: "低位排水与反涌安全", status: "live", href: "basement-lifting/index.html" },
      { title: "露点与除湿控制", note: "直膨除湿新风与定点排水", status: "live", href: "basement-dewpoint/index.html" },
      { title: "墙体隔热保温", note: "热边界、冷桥与防结露", status: "live", href: "basement-envelope/index.html" }
    ]
  },
  water: {
    kicker: "WATER & DRAINAGE",
    title: "水在该来的时候从容到达，在该走的时候安静离开",
    description: "从用水需求出发，组织水质、水压、热水、循环、排水、降噪与长期维护。",
    tone: "water",
    guide: [
      ["#water", "给排水总览", "理解完整住宅水系统的价值"],
      ["#water-logic", "失衡信号", "从生活里的小打断识别系统缺口"],
      ["#water-supply-drainage", "生活水场景", "厨房、卫浴、庭院与地下空间"]
    ],
    specialLabel: "专业专栏",
    specials: [
      { title: "住宅给水与智慧水务", note: "316L · 稳压 · 监测", status: "live", href: "residential-water-supply/index.html" },
      { title: "分质净水与鲜活热水", note: "净水 · 软水 · 循环", status: "live", href: "water-treatment-hot-water/index.html" },
      { title: "静音排水与防臭系统", note: "GF Silenta · PP排水", status: "live", href: "silent-drainage/index.html" }
    ]
  },
  delivery: {
    kicker: "DESIGN TO DELIVERY",
    title: "从设计判断，一直走到长期稳定运行",
    description: "设计、深化、施工、调试与维护不是分散环节，而是一条必须持续守住的结果链。",
    tone: "delivery",
    guide: [
      ["#delivery-page", "前期诊断", "先理解住宅、家庭与系统目标"],
      ["#integration", "系统深化", "让机电进入建筑和空间关系"],
      ["#team-execution", "施工协同", "让图纸判断被准确还原"],
      ["#process", "调试验收", "以运行数据而不是设备启动交付"]
    ],
    specialLabel: "专业专栏",
    specials: [
      { title: "住宅机电设计", note: "需求与方案专题", status: "foundation", href: "#delivery-page" },
      { title: "机电深化与交付", note: "现场协同专题", status: "foundation", href: "#integration" },
      { title: "调试验收与维护", note: "长期运行专题", status: "foundation", href: "#process" }
    ]
  },
  access: {
    kicker: "PRIVATE RESIDENTIAL SERVICE",
    title: "从一套住宅的真实条件开始",
    description: "项目阶段、建筑条件、生活方式与目标不同，系统路线也应该被重新判断。",
    tone: "access",
    guide: [
      ["#project-access-solutions", "住宅类型", "从住宅条件进入系统判断"],
      ["#project-access-contact", "预约咨询", "提交项目基础信息与当前阶段"],
      ["#project-access-network", "服务网络", "长沙展厅、体验空间与湖南服务"],
      ["#project-access-expertise-title", "专业能力", "查看系统设计与交付边界"]
    ],
    specialLabel: "进一步了解",
    specials: [
      { title: "五恒住宅系统", note: "专业专题 · 已上线", status: "live", href: "five-constant-system/index.html" },
      { title: "住宅案例档案", note: "长沙、衡阳与全国案例", status: "foundation", href: "#project-access-network" },
      { title: "公众号案例分享", note: "独立内容体系", status: "foundation", href: "#project-access-contact" }
    ]
  }
};

const pageStoryRailData = {
  philosophy: {
    label: "住宅理念",
    items: [["#home", "以人为先"], ["#dimensions", "空气 · 水 · 光 · 声"]]
  },
  systems: {
    label: "室内空气",
    items: [["#climate", "湖南气候"], ["#environment-problem", "身体感受"], ["#environment-logic", "系统逻辑"], ["#systems", "空间场景"]]
  },
  "water-supply-drainage": {
    label: "住宅水系统",
    items: [["#water-problem", "用水判断"], ["#water-logic", "失衡信号"], ["#water-supply-drainage", "生活场景"]]
  },
  "basement-system": {
    label: "地下空间",
    items: [["#basement-definition", "空间定义"], ["#basement-problem", "环境风险"], ["#basement-logic", "系统协同"], ["#basement-sport-layer", "生活场景"]]
  },
  delivery: {
    label: "设计交付",
    items: [["#fit", "设计起点"], ["#delivery-outputs", "交付成果"], ["#delivery-method", "设计与施工"], ["#delivery-stages", "工作阶段"]]
  },
  "project-access": {
    label: "专属方案",
    items: [["#project-access-solutions", "住宅类型"], ["#project-access-contact", "联系预约"], ["#project-access-network", "服务网络"], ["#project-access-expertise-title", "专业能力"]]
  }
};

const initPageStoryRail = () => {
  const main = $("main");
  if (!main) return;

  const render = () => {
    const raw = window.location.hash.replace("#", "") || "home";
    const page = routeAliases[raw] || (pageRoutes[raw] ? raw : "home");
    const data = pageStoryRailData[page];
    let rail = $("[data-page-story-rail]");

    if (!data) {
      rail?.remove();
      return;
    }

    if (!rail) {
      rail = document.createElement("nav");
      rail.className = "zf-page-story-rail";
      rail.dataset.pageStoryRail = "";
      rail.setAttribute("aria-label", "本页内容导览");
      main.prepend(rail);
    }

    const currentHref = `#${raw}`;
    const matchedIndex = data.items.findIndex(([href]) => href === currentHref);
    const activeIndex = matchedIndex >= 0 ? matchedIndex : 0;

    rail.dataset.tone = page;
    rail.innerHTML = `
      <strong>${data.label}</strong>
      <div>
        ${data.items.map(([href, label], index) => `<a href="${href}"${index === activeIndex ? ' class="is-active" aria-current="location"' : ""}><i>${String(index + 1).padStart(2, "0")}</i><span>${label}</span></a>`).join("")}
      </div>`;
  };

  render();
  window.addEventListener("hashchange", () => requestAnimationFrame(render));
  window.addEventListener("popstate", () => requestAnimationFrame(render));
  window.addEventListener("zf:routechange", () => requestAnimationFrame(render));
};

const initNav = () => {
  const button = $(".menu-toggle");
  const menu = $(".mobile-menu");
  const mobileNav = $("[data-mobile-nav]");
  const header = $("[data-header]");
  const desktopNav = $(".desktop-nav");
  const desktopTriggers = $$("[data-nav-key]", desktopNav);
  if (!button || !menu || !mobileNav || !header || !desktopNav) return;

  const guideMarkup = (items, mobile = false) =>
    items
      .map(
        ([href, title, note], index) => `
          <a class="${mobile ? "mobile-nav-guide-link" : "nav-mega-guide-link"}" href="${href}">
            <i aria-hidden="true">${String(index + 1).padStart(2, "0")}</i>
            <span>${title}</span>
            <small>${note}</small>
            <b aria-hidden="true">↗</b>
          </a>`
      )
      .join("");

  const specialMarkup = (items, mobile = false) =>
    items
      .map((item, index) => {
        const className = `${mobile ? "mobile-nav-special" : "nav-mega-special"} ${item.status === "live" ? "is-live" : "is-foundation"}`;
        const inner = `
          <i aria-hidden="true">${String(index + 1).padStart(2, "0")}</i>
          <span>
            <strong>${item.title}</strong>
            <small>${item.note}</small>
          </span>
          <em>${item.status === "live" ? "进入专栏" : "进入主题"}</em>`;
        return `<a class="${className}" href="${item.href}">${inner}</a>`;
      })
      .join("");

  const mega = document.createElement("div");
  mega.className = "nav-mega";
  mega.dataset.navMega = "";
  mega.hidden = true;
  mega.setAttribute("aria-hidden", "true");
  header.appendChild(mega);

  let activeTrigger = null;
  let closeTimer = null;
  let hideTimer = null;

  const closeMega = (immediate = false) => {
    window.clearTimeout(closeTimer);
    window.clearTimeout(hideTimer);
    if (activeTrigger) activeTrigger.setAttribute("aria-expanded", "false");
    activeTrigger = null;
    mega.classList.remove("is-open");
    mega.setAttribute("aria-hidden", "true");
    const finish = () => {
      if (!mega.classList.contains("is-open")) mega.hidden = true;
    };
    if (immediate) finish();
    else hideTimer = window.setTimeout(finish, 180);
  };

  const scheduleClose = () => {
    window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(() => closeMega(), 150);
  };

  const openMega = (trigger) => {
    const key = trigger.dataset.navKey;
    const item = navigationArchitecture[key];
    if (!item) return;
    window.clearTimeout(closeTimer);
    window.clearTimeout(hideTimer);
    if (activeTrigger && activeTrigger !== trigger) {
      activeTrigger.setAttribute("aria-expanded", "false");
    }
    activeTrigger = trigger;
    trigger.setAttribute("aria-expanded", "true");
    mega.dataset.tone = item.tone;
    const sectionNumber = String(Object.keys(navigationArchitecture).indexOf(key) + 1).padStart(2, "0");
    mega.innerHTML = `
      <div class="nav-mega-intro">
        <b class="nav-mega-number" aria-hidden="true">${sectionNumber}</b>
        <p>${item.kicker}</p>
        <h2>${item.title}</h2>
        <span>${item.description}</span>
      </div>
      <div class="nav-mega-guide">
        <p>本页导览</p>
        <div>${guideMarkup(item.guide)}</div>
      </div>
      <aside class="nav-mega-specials">
        <p>${item.specialLabel}</p>
        <div>${specialMarkup(item.specials)}</div>
      </aside>`;
    mega.hidden = false;
    mega.setAttribute("aria-hidden", "false");
    requestAnimationFrame(() => mega.classList.add("is-open"));
  };

  desktopTriggers.forEach((trigger) => {
    trigger.addEventListener("mouseenter", () => openMega(trigger));
    trigger.addEventListener("focus", () => openMega(trigger));
    trigger.addEventListener("click", () => closeMega(true));
    trigger.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        openMega(trigger);
        requestAnimationFrame(() => mega.querySelector("a")?.focus());
      }
      if (event.key === "Escape") {
        closeMega(true);
        trigger.focus();
      }
    });
  });

  desktopNav.addEventListener("mouseleave", scheduleClose);
  desktopNav.addEventListener("mouseenter", () => window.clearTimeout(closeTimer));
  mega.addEventListener("mouseenter", () => window.clearTimeout(closeTimer));
  mega.addEventListener("mouseleave", scheduleClose);
  mega.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMega();
  });
  header.addEventListener("focusout", (event) => {
    if (!header.contains(event.relatedTarget)) closeMega();
  });
  header.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && activeTrigger) {
      const trigger = activeTrigger;
      closeMega(true);
      trigger.focus();
    }
  });

  mobileNav.innerHTML = `
    <a class="mobile-nav-home" href="#landing"><span>首页</span><small>HOME</small></a>
    ${Object.entries(navigationArchitecture)
      .map(([key, item]) => {
        const mainHref = document.querySelector(`[data-nav-key="${key}"]`)?.getAttribute("href") || "#landing";
        const mainLabel = document.querySelector(`[data-nav-key="${key}"]`)?.childNodes[0]?.textContent?.trim() || item.title;
        return `
          <section class="mobile-nav-section" data-mobile-nav-section="${key}">
            <div class="mobile-nav-heading">
              <a href="${mainHref}"><span>${mainLabel}</span><small>${item.kicker}</small></a>
              <button type="button" aria-expanded="false" aria-label="展开${mainLabel}导航" data-mobile-nav-toggle="${key}">
                <span aria-hidden="true"></span>
              </button>
            </div>
            <div class="mobile-nav-panel" data-mobile-nav-panel="${key}" hidden>
              <p class="mobile-nav-description">${item.description}</p>
              <div class="mobile-nav-guide">${guideMarkup(item.guide, true)}</div>
              <p class="mobile-nav-special-label">${item.specialLabel}</p>
              <div class="mobile-nav-specials">${specialMarkup(item.specials, true)}</div>
            </div>
          </section>`;
      })
      .join("")}
    <a class="mobile-nav-home mobile-nav-maintenance" href="login/index.html" target="_blank" rel="noopener">
      <span>客户维保</span><small>独立客户系统 · 新窗口打开 ↗</small>
    </a>`;

  const closeMobileMenu = () => {
    menu.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");
  };

  button.addEventListener("click", () => {
    const open = !menu.classList.contains("is-open");
    menu.classList.toggle("is-open", open);
    button.setAttribute("aria-expanded", String(open));
    if (open) closeMega(true);
  });

  $$("[data-mobile-nav-toggle]", mobileNav).forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const key = toggle.dataset.mobileNavToggle;
      const panel = mobileNav.querySelector(`[data-mobile-nav-panel="${key}"]`);
      const open = toggle.getAttribute("aria-expanded") !== "true";
      $$("[data-mobile-nav-toggle]", mobileNav).forEach((otherToggle) => {
        const otherKey = otherToggle.dataset.mobileNavToggle;
        const otherPanel = mobileNav.querySelector(`[data-mobile-nav-panel="${otherKey}"]`);
        const shouldOpen = otherToggle === toggle && open;
        otherToggle.setAttribute("aria-expanded", String(shouldOpen));
        if (otherPanel) otherPanel.hidden = !shouldOpen;
      });
      if (open && panel) panel.scrollIntoView({ block: "nearest" });
    });
  });

  $$("a", mobileNav).forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) {
      closeMega();
      closeMobileMenu();
    }
  });
};

const initHeroCarousel = () => {
  const carousel = $("[data-zf-home-hero]");
  if (!carousel) return;
  const slides = $$("[data-zf-home-slide]", carousel);
  const dotsWrap = $("[data-zf-home-dots]", carousel);
  const prevButton = $("[data-zf-home-prev]", carousel);
  const nextButton = $("[data-zf-home-next]", carousel);
  if (slides.length < 2 || !dotsWrap) return;

  let activeIndex = 0;
  let timer = null;
  const intervals = [5600, 5000, 5200];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  dotsWrap.innerHTML = slides
    .map((_, index) => `<button class="zf-home-hero-dot" type="button" aria-label="切换到第 ${index + 1} 张首屏图"></button>`)
    .join("");
  const dots = $$(".zf-home-hero-dot", dotsWrap);

  const showSlide = (index, shouldSchedule = true) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeIndex);
      slide.setAttribute("aria-hidden", String(slideIndex !== activeIndex));
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeIndex);
      dot.setAttribute("aria-current", dotIndex === activeIndex ? "true" : "false");
    });
    if (shouldSchedule && !reduceMotion) {
      clearTimeout(timer);
      timer = window.setTimeout(() => showSlide(activeIndex + 1), intervals[activeIndex] || 6800);
    }
  };

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));
  });

  prevButton?.addEventListener("click", () => showSlide(activeIndex - 1));
  nextButton?.addEventListener("click", () => showSlide(activeIndex + 1));

  const showSlideFromHash = () => {
    const key = window.location.hash.replace("#", "");
    if (!key) return false;
    const targetIndex = slides.findIndex((slide) => slide.id === key || slide.dataset.homeKey === key);
    if (targetIndex < 0) return false;
    showSlide(targetIndex, !reduceMotion);
    return true;
  };

  window.addEventListener("hashchange", showSlideFromHash);
  carousel.addEventListener("mouseenter", () => clearTimeout(timer));
  carousel.addEventListener("mouseleave", () => showSlide(activeIndex));
  if (!showSlideFromHash()) {
    showSlide(0, !reduceMotion);
  }
};

const initReveal = () => {
  const items = $$(".reveal");
  const revealVisibleItems = () => {
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < viewportHeight * 0.94 && rect.bottom > viewportHeight * 0.04) {
        item.classList.add("is-visible");
      }
    });
  };

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );
  items.forEach((item) => observer.observe(item));
  requestAnimationFrame(revealVisibleItems);
  window.addEventListener("hashchange", () => requestAnimationFrame(revealVisibleItems));
};

const fitTextToSingleLine = (element) => {
  if (!element || element.dataset.fitProcessed === "true") return;
  const styles = window.getComputedStyle(element);
  const originalFontSize = parseFloat(styles.fontSize);
  const originalLineHeight = parseFloat(styles.lineHeight);
  if (!Number.isFinite(originalFontSize)) return;
  let nextSize = originalFontSize;
  const minSize = Math.max(12, originalFontSize * 0.74);
  element.style.whiteSpace = "nowrap";
  while (element.scrollWidth > element.clientWidth + 1 && nextSize > minSize) {
    nextSize -= 0.5;
    element.style.fontSize = `${nextSize}px`;
    if (Number.isFinite(originalLineHeight)) {
      element.style.lineHeight = `${Math.max(nextSize * 1.12, originalLineHeight * (nextSize / originalFontSize))}px`;
    }
  }
  if (element.scrollWidth > element.clientWidth + 1) {
    element.style.whiteSpace = "normal";
    element.style.textWrap = "balance";
  }
  element.dataset.fitProcessed = "true";
};

const resetAdaptiveText = (element) => {
  element.style.removeProperty("font-size");
  element.style.removeProperty("line-height");
  element.style.removeProperty("white-space");
  element.style.removeProperty("text-wrap");
  delete element.dataset.fitProcessed;
};

const applyAdaptiveText = () => {
  adaptiveTextSelectors.forEach((selector) => {
    $$(selector).forEach((element) => {
      resetAdaptiveText(element);
      fitTextToSingleLine(element);
    });
  });
};

const initAdaptiveText = () => {
  let resizeTimer;
  const rerun = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(applyAdaptiveText, 80);
  };
  window.addEventListener("load", rerun, { once: true });
  window.addEventListener("resize", rerun);
  window.addEventListener("orientationchange", rerun);
  applyAdaptiveText();
};

const lockWaterRouteLayout = () => {
  const apply = () => {
    if (document.body.dataset.page !== "water-supply-drainage") return;

    const intro = document.querySelector("#water-problem .system-cognition-inner");
    if (intro) {
      intro.style.width = "100%";
      intro.style.maxWidth = "760px";
      intro.style.margin = "0";
      intro.style.padding = "0";
      intro.style.textAlign = "left";
      intro.querySelectorAll(".eyebrow, h1, p").forEach((node) => {
        node.style.marginLeft = "0";
        node.style.marginRight = "auto";
        node.style.textAlign = "left";
      });
    }

    const accordion = document.querySelector("#water-supply-drainage .water-accordion");
    if (accordion) {
      accordion.style.marginBottom = "140px";
      accordion.style.paddingBottom = "180px";
    }

    const lastGroup = document.querySelector("#water-supply-drainage .water-accordion-group:last-child");
    if (lastGroup) {
      lastGroup.style.marginBottom = "100px";
      lastGroup.style.paddingBottom = "0";
    }
  };

  window.addEventListener("hashchange", () => window.setTimeout(apply, 60));
  window.addEventListener("load", () => window.setTimeout(apply, 60), { once: true });
  window.addEventListener("resize", apply);
  window.setTimeout(apply, 60);
};


const initAirEnvironmentSimulator = () => {
  const section = document.getElementById("air-simulator-step");
  const detail = section?.matches("details") ? section : section?.closest("details");
  const stage = section?.querySelector("[data-air-sim-stage]");
  const entry = section?.querySelector("[data-air-sim-entry]");
  const launch = section?.querySelector("[data-air-sim-launch]");
  const label = section?.querySelector("[data-air-sim-label]");
  const note = section?.querySelector("[data-air-sim-note]");
  const metrics = Array.from(section?.querySelectorAll("[data-air-metric]") || []);
  if (!section || !detail || !stage || !entry || !launch || !label || !note || !metrics.length) return;

  const states = {
    before: {
      label: "失衡",
      tone: "danger",
      note: "空间先显出闷、潮、轻微异味和设备存在感，生活还没有完全放松下来。",
      button: "开始五恒模拟",
      values: {
        air: "闷重不清爽",
        moisture: "露点偏高，表面发黏",
        fresh: "空气更新滞后，颗粒物停留",
        quiet: "风感和设备存在感明显"
      }
    },
    freshAir: {
      label: "新风建立中",
      tone: "warning",
      note: "DOAS 先把送风、回风、排风和补风路径建立起来，让空间开始真正呼吸。",
      button: "模拟进行中",
      values: {
        air: "空气开始变轻，闷感先退一步",
        moisture: "湿气还在回落，但边界已经被收住",
        fresh: "新风、过滤和排风路径正在形成",
        quiet: "末端介入克制，避免一下子把风感做重"
      }
    },
    dehumidifying: {
      label: "控湿回稳中",
      tone: "warning",
      note: "过滤除湿和露点保护继续介入，把湖南住宅最容易积累的潮感慢慢拉回舒适区。",
      button: "模拟进行中",
      values: {
        air: "空气更干净，呼吸负担开始减轻",
        moisture: "含湿量下降，表面结露风险退后",
        fresh: "颗粒物和异味不再停留在房间里",
        quiet: "气流更柔和，没有明显直吹感"
      }
    },
    balancing: {
      label: "体感校准中",
      tone: "stable",
      note: "辐射冷暖、地面调温和低噪末端一起校准空气、表面温度和风速，让舒适不只停留在温度表上。",
      button: "模拟进行中",
      values: {
        air: "清爽、平顺，适合继续久留",
        moisture: "表面开始干爽，潮感明显退去",
        fresh: "空气更新稳定，气味边界更清楚",
        quiet: "噪声和设备感被继续压低"
      }
    },
    stable: {
      label: "稳定",
      tone: "stable",
      note: "空气、湿度、洁净度、表面温度和设备感都进入稳定区，空间重新回到完整生活场景。",
      button: "重新模拟",
      values: {
        air: "空气轻、温和、可久留",
        moisture: "表面干爽，不闷不结露",
        fresh: "新鲜空气稳定进入，异味有序离开",
        quiet: "只剩生活本身，设备感退到背后"
      }
    }
  };

  const applyState = (name) => {
    const state = states[name];
    stage.dataset.airSimState = name;
    stage.dataset.airSimTone = state.tone;
    label.textContent = state.label;
    note.textContent = state.note;
    launch.textContent = state.button;
    launch.disabled = !["before", "stable"].includes(name);
    metrics.forEach((metric) => {
      const key = metric.dataset.airMetric;
      const value = state.values[key];
      if (!value) return;
      metric.querySelector("[data-air-value]").textContent = value;
    });
  };

  let timers = [];
  const clearTimers = () => {
    timers.forEach((timer) => window.clearTimeout(timer));
    timers = [];
  };

  const openStage = () => {
    detail.open = true;
    stage.hidden = false;
    entry.setAttribute("aria-expanded", "true");
    entry.textContent = "收起五恒模拟器";
  };

  const focusStage = () => {
    const target = stage.hidden ? section : stage;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      window.scrollBy({ top: -18, behavior: "smooth" });
    }, 160);
  };

  const closeStage = () => {
    clearTimers();
    applyState("before");
    stage.hidden = true;
    entry.setAttribute("aria-expanded", "false");
    entry.textContent = "展开五恒模拟器";
  };

  detail.addEventListener("toggle", () => {
    if (!detail.open) {
      closeStage();
    }
  });

  const run = () => {
    if (stage.dataset.airSimState === "stable") {
      clearTimers();
      applyState("before");
      return;
    }
    clearTimers();
    applyState("freshAir");
    timers.push(window.setTimeout(() => applyState("dehumidifying"), 1500));
    timers.push(window.setTimeout(() => applyState("balancing"), 3200));
    timers.push(window.setTimeout(() => applyState("stable"), 5000));
  };

  entry.addEventListener("click", () => {
    if (stage.hidden) {
      openStage();
      window.setTimeout(focusStage, 40);
      return;
    }
    closeStage();
    focusStage();
  });
  launch.addEventListener("click", run);
  applyState("before");
  closeStage();
};

const initAccessForms = () => {
  $$("[data-access-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = form.querySelector("input[name='code']");
      const rawCode = input?.value.trim() || "";
      const target = new URL(form.getAttribute("action") || "login/index.html", window.location.href);
      if (rawCode) {
        target.searchParams.set("code", rawCode);
      }
      window.location.href = target.toString();
    });
  });

  $$("[data-project-access-mail]").forEach((form) => {
    const submitButton = form.querySelector(".project-access-submit");
    const status = form.querySelector("[data-project-access-status]");
    const defaultLabel = submitButton?.textContent?.trim() || "提交联系信息";
    const endpoint = form.getAttribute("action");

    if (!submitButton || !status || !endpoint) {
      return;
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!form.reportValidity()) {
        return;
      }

      submitButton.disabled = true;
      submitButton.textContent = "正在发送";
      status.textContent = "正在提交，请稍候。";
      status.classList.remove("is-error", "is-success");

      const formData = new FormData(form);
      formData.set("_subject", "ZEFENG MEP 网站新线索");
      formData.set("来源页面", "专属方案 / Project Access");
      formData.set("提交时间", new Date().toLocaleString("zh-CN", { hour12: false }));

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Accept": "application/json"
          },
          body: formData
        });

        if (!response.ok) {
          throw new Error(`Mail request failed: ${response.status}`);
        }

        const payload = await response.json().catch(() => ({}));
        if (payload?.success === "false") {
          throw new Error(payload.message || "Mail submission rejected");
        }

        form.reset();
        status.textContent = "信息已发送，我们会在邮件中收到您的联系内容。";
        status.classList.add("is-success");
      } catch (error) {
        console.error(error);
        status.textContent = "发送未完成，请稍后重试，或直接发送邮件至 zfmep@icloud.com。";
        status.classList.add("is-error");
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = defaultLabel;
      }
    });
  });
};

const TYPOGRAPHY_LOCK = {
  eyebrow: {
    fontSize: "clamp(12px, 0.82vw, 13px)",
    lineHeight: "1.45",
    letterSpacing: "0.08em"
  },
  h1: {
    fontSize: "clamp(34px, 2.45vw, 40px)",
    lineHeight: "1.26",
    letterSpacing: "0"
  },
  h2: {
    fontSize: "clamp(24px, 1.72vw, 28px)",
    lineHeight: "1.32",
    letterSpacing: "0"
  },
  h3: {
    fontSize: "clamp(18px, 1.28vw, 20px)",
    lineHeight: "1.46",
    letterSpacing: "0"
  },
  body: {
    fontSize: "clamp(15px, 0.98vw, 16px)",
    lineHeight: "1.82",
    letterSpacing: "0"
  },
  small: {
    fontSize: "clamp(13px, 0.88vw, 14px)",
    lineHeight: "1.7",
    letterSpacing: "0"
  },
  mobile: {
    h1: "clamp(28px, 7.1vw, 32px)",
    h2: "clamp(20px, 5.6vw, 24px)",
    h3: "clamp(17px, 4.7vw, 18px)",
    body: "clamp(14px, 3.95vw, 15px)",
    eyebrow: "12px",
    small: "13px"
  }
};

const setLockedTypography = (elements, config) => {
  elements.forEach((element) => {
    element.style.setProperty("font-size", config.fontSize, "important");
    element.style.setProperty("line-height", config.lineHeight, "important");
    if (config.letterSpacing != null) {
      element.style.setProperty("letter-spacing", config.letterSpacing, "important");
    }
  });
};

const setLockedStyles = (elements, styles) => {
  elements.forEach((element) => {
    Object.entries(styles).forEach(([property, value]) => {
      element.style.setProperty(property, value, "important");
    });
  });
};

const applyGlobalTypographyLock = () => {
  const isMobile = window.matchMedia("(max-width: 900px)").matches;
  const philosophyRule = {
    titleWidth: isMobile ? "100%" : "min(1616px, calc(100vw - 112px))",
    copyWidth: isMobile ? "100%" : "min(1616px, calc(100vw - 112px))",
    panelGap: isMobile ? "22px" : "34px",
    copyGap: isMobile ? "12px" : "14px",
    panelMarginTop: isMobile ? "42px" : "86px",
    firstPanelMarginTop: isMobile ? "24px" : "clamp(30px, 4vw, 56px)",
    figureRatio: "16 / 9",
    bodyLineHeight: isMobile ? "1.9" : "1.92",
    bodyLetterSpacing: "0.008em"
  };

  const h1Nodes = $$([
    "#home h1",
    "#water-problem .water-system-definition-copy h1",
    "#environment-problem .air-system-definition-copy h1",
    "#basement-definition .basement-definition-copy h1"
  ].join(", "));

  const h2Nodes = $$([
    "#water-problem .water-system-journey-head h2",
    "#water-system-simulator-entry .water-system-simulator-intro h3",
    "#water-system-simulator-entry .water-system-simulator-heading h2",
    "body[data-page='philosophy'] #home .home-philosophy-intro .home-copy > h2",
    "body[data-page='philosophy'] #home .home-hero-copy > h2",
    "body[data-page='philosophy'] #home .home-sanctuary-copy > h2",
    "body[data-page='philosophy'] #home :is(.home-shift, .home-feelings, .home-mep, .home-courtyard) .home-copy > h2",
    "body[data-page='philosophy'] #dimensions > .section-heading h2",
    "#climate > .section-heading h2",
    ".quiet-system .section-copy h2",
    "#delivery .section-copy h2",
    "#fit .section-copy h2",
    "#constraints .section-copy h2",
    "#integration .section-copy h2",
    "#team-execution .section-copy h2",
    "#process .section-copy h2",
    "#basement-logic .image-entry-copy h2",
    "#basement-lifting .image-entry-copy h2"
  ].join(", "));

  const h3Nodes = $$([
    "body[data-page='philosophy'] #dimensions .dimension-content h3",
    "body[data-page='philosophy'] #dimensions .dimension-closing-zh",
    "#systems .scene-content h3",
    "#systems .systems-closing h3",
    "#water-supply-drainage .water-proof-copy h3",
    "#basement-system .basement-copy h3",
    "#basement-summary .basement-copy h3",
    "#delivery .delivery-card h3"
  ].join(", "));

  const eyebrowNodes = $$([
    ".eyebrow",
    ".systems-closing-eyebrow",
    ".water-system-journey-kicker",
    ".water-system-sim-kicker"
  ].join(", "));

  const bodyNodes = $$([
    "body[data-page='philosophy'] #home .home-philosophy-intro .home-copy > p",
    "body[data-page='philosophy'] #home .home-hero-copy > :is(.home-subtitle, .home-quiet-line, p, .home-note)",
    "body[data-page='philosophy'] #home .home-sanctuary-copy > p",
    "body[data-page='philosophy'] #home :is(.home-shift, .home-feelings, .home-mep, .home-courtyard) .home-copy > p",
    "body[data-page='philosophy'] #home .home-philosophy-closing > span",
    "body[data-page='philosophy'] #dimensions > .section-heading .lead",
    "body[data-page='philosophy'] #dimensions .dimension-content :is(p, blockquote)",
    "body[data-page='philosophy'] #dimensions .dimension-closing-en",
    "#home p:not(.home-eyebrow)",
    "#water-problem .water-system-definition-lead",
    "#water-problem .water-system-journey-head p",
    "#water-system-simulator-entry .water-system-simulator-intro > p:not(.eyebrow)",
    "#water-system-simulator-entry .water-system-simulator-heading p",
    "#systems .scene-content p:not(.eyebrow)",
    "#systems .systems-closing p:not(.systems-closing-eyebrow)",
    "#water-supply-drainage .water-proof-copy p:not(.eyebrow)",
    "#basement-definition .basement-definition-lead",
    "#basement-system .basement-copy p:not(.eyebrow):not(blockquote)",
    "#basement-problem .system-cognition-inner > p:last-child",
    "#basement-logic .image-entry-copy p:not(.eyebrow):not(blockquote)",
    "#basement-lifting .image-entry-copy p:not(.eyebrow):not(blockquote)",
    "#delivery .section-copy p:not(.eyebrow):not(.section-bridge)"
  ].join(", "));

  const smallNodes = $$([
    "#water-supply-drainage figcaption",
    "#water-problem .water-diagram-label strong",
    "#water-problem .water-diagram-label em",
    "#basement-definition .basement-diagram-label strong",
    "#basement-definition .basement-diagram-label em",
    "#delivery .delivery-card-index"
  ].join(", "));

  setLockedTypography(eyebrowNodes, {
    ...TYPOGRAPHY_LOCK.eyebrow,
    fontSize: isMobile ? TYPOGRAPHY_LOCK.mobile.eyebrow : TYPOGRAPHY_LOCK.eyebrow.fontSize
  });

  setLockedTypography(h1Nodes, {
    ...TYPOGRAPHY_LOCK.h1,
    fontSize: isMobile ? TYPOGRAPHY_LOCK.mobile.h1 : TYPOGRAPHY_LOCK.h1.fontSize
  });

  setLockedTypography(h2Nodes, {
    ...TYPOGRAPHY_LOCK.h2,
    fontSize: isMobile ? TYPOGRAPHY_LOCK.mobile.h2 : TYPOGRAPHY_LOCK.h2.fontSize
  });

  setLockedTypography(h3Nodes, {
    ...TYPOGRAPHY_LOCK.h3,
    fontSize: isMobile ? TYPOGRAPHY_LOCK.mobile.h3 : TYPOGRAPHY_LOCK.h3.fontSize
  });

  setLockedTypography(bodyNodes, {
    ...TYPOGRAPHY_LOCK.body,
    fontSize: isMobile ? TYPOGRAPHY_LOCK.mobile.body : TYPOGRAPHY_LOCK.body.fontSize
  });

  setLockedTypography(smallNodes, {
    ...TYPOGRAPHY_LOCK.small,
    fontSize: isMobile ? TYPOGRAPHY_LOCK.mobile.small : TYPOGRAPHY_LOCK.small.fontSize
  });

  const philosophyHeadingNodes = $$([
    "body[data-page='philosophy'] #home .home-philosophy-intro .home-copy > h2",
    "body[data-page='philosophy'] #home .home-hero-copy > :is(h1, h2)",
    "body[data-page='philosophy'] #home .home-sanctuary-copy > h2",
    "body[data-page='philosophy'] #home :is(.home-shift, .home-feelings, .home-mep, .home-courtyard) .home-copy > h2",
    "body[data-page='philosophy'] #home .home-philosophy-closing-title",
    "body[data-page='philosophy'] #dimensions > .section-heading h2",
    "body[data-page='philosophy'] #dimensions .dimension-content h3",
    "body[data-page='philosophy'] #dimensions .dimension-closing-zh"
  ].join(", "));

  const philosophyBodyNodes = $$([
    "body[data-page='philosophy'] #home .home-philosophy-intro .home-copy > p",
    "body[data-page='philosophy'] #home .home-hero-copy > :is(.home-subtitle, .home-quiet-line, p, .home-note)",
    "body[data-page='philosophy'] #home .home-sanctuary-copy > p",
    "body[data-page='philosophy'] #home :is(.home-shift, .home-feelings, .home-mep, .home-courtyard) .home-copy > :is(p, .home-note)",
    "body[data-page='philosophy'] #home .home-philosophy-closing > span",
    "body[data-page='philosophy'] #dimensions > .section-heading .lead",
    "body[data-page='philosophy'] #dimensions .dimension-content :is(p, blockquote)",
    "body[data-page='philosophy'] #dimensions .dimension-closing-en"
  ].join(", "));

  const philosophyEyebrowNodes = $$([
    "body[data-page='philosophy'] #home .home-eyebrow",
    "body[data-page='philosophy'] #dimensions > .section-heading .eyebrow",
    "body[data-page='philosophy'] #dimensions .dimension-content .eyebrow",
    "body[data-page='philosophy'] #dimensions .dimension-closing-en"
  ].join(", "));

  const philosophyTitleNodes = $$([
    "body[data-page='philosophy'] #home .home-philosophy-intro .home-copy > h2",
    "body[data-page='philosophy'] #home .home-hero-copy > :is(h1, h2)",
    "body[data-page='philosophy'] #home .home-sanctuary-copy > h2",
    "body[data-page='philosophy'] #home :is(.home-shift, .home-feelings, .home-mep, .home-courtyard) .home-copy > h2",
    "body[data-page='philosophy'] #home .home-philosophy-closing-title",
    "body[data-page='philosophy'] #dimensions > .section-heading h2",
    "body[data-page='philosophy'] #dimensions .dimension-content h3",
    "body[data-page='philosophy'] #dimensions .dimension-closing-zh"
  ].join(", "));

  const philosophyCopyNodes = $$([
    "body[data-page='philosophy'] #home .home-philosophy-intro .home-copy > p",
    "body[data-page='philosophy'] #home .home-hero-copy > :is(.home-subtitle, .home-quiet-line, p, .home-note)",
    "body[data-page='philosophy'] #home .home-sanctuary-copy > p",
    "body[data-page='philosophy'] #home :is(.home-shift, .home-feelings, .home-mep, .home-courtyard) .home-copy > :is(p, .home-note)",
    "body[data-page='philosophy'] #home .home-philosophy-closing > span",
    "body[data-page='philosophy'] #dimensions > .section-heading .lead",
    "body[data-page='philosophy'] #dimensions .dimension-content :is(p, blockquote)",
    "body[data-page='philosophy'] #dimensions .dimension-closing-en"
  ].join(", "));

  const philosophyIntroCopyNodes = $$([
    "body[data-page='philosophy'] #home .home-philosophy-intro .home-copy > p",
    "body[data-page='philosophy'] #home .home-philosophy-closing > span",
    "body[data-page='philosophy'] #dimensions > .section-heading .lead"
  ].join(", "));

  const philosophySceneCopyNodes = $$([
    "body[data-page='philosophy'] #home .home-hero-copy > :is(.home-subtitle, .home-quiet-line, p, .home-note)",
    "body[data-page='philosophy'] #home .home-sanctuary-copy > p",
    "body[data-page='philosophy'] #home :is(.home-shift, .home-feelings, .home-mep, .home-courtyard) .home-copy > p:not(.home-eyebrow)",
    "body[data-page='philosophy'] #home :is(.home-shift, .home-feelings, .home-mep, .home-courtyard) .home-copy > .home-note",
    "body[data-page='philosophy'] #dimensions .dimension-content :is(p, blockquote)",
    "body[data-page='philosophy'] #dimensions .dimension-closing-en"
  ].join(", "));

  const philosophyMediaFrameNodes = $$([
    "body[data-page='philosophy'] #home .home-philosophy-intro figure",
    "body[data-page='philosophy'] #home .home-hero-media",
    "body[data-page='philosophy'] #home .home-sanctuary-media",
    "body[data-page='philosophy'] #home .home-image"
  ].join(", "));

  const philosophyMediaImageNodes = $$([
    "body[data-page='philosophy'] #home .home-philosophy-intro figure img",
    "body[data-page='philosophy'] #home .home-hero-media img",
    "body[data-page='philosophy'] #home .home-sanctuary-media img",
    "body[data-page='philosophy'] #home .home-image img"
  ].join(", "));

  const philosophyDimensionMediaImageNodes = $$([
    "body[data-page='philosophy'] #dimensions .dimension-media img"
  ].join(", "));

  const philosophyPanelNodes = $$([
    "body[data-page='philosophy'] #home > .home-philosophy-intro",
    "body[data-page='philosophy'] #home > .home-hero",
    "body[data-page='philosophy'] #home > .home-sanctuary",
    "body[data-page='philosophy'] #home > .home-shift",
    "body[data-page='philosophy'] #home > .home-feelings",
    "body[data-page='philosophy'] #home > .home-mep",
    "body[data-page='philosophy'] #home > .home-courtyard"
  ].join(", "));

  const philosophyScenePanelNodes = $$([
    "body[data-page='philosophy'] #home > .home-philosophy-intro",
    "body[data-page='philosophy'] #home > .home-hero",
    "body[data-page='philosophy'] #home > .home-sanctuary",
    "body[data-page='philosophy'] #home > .home-shift",
    "body[data-page='philosophy'] #home > .home-feelings",
    "body[data-page='philosophy'] #home > .home-mep",
    "body[data-page='philosophy'] #home > .home-courtyard"
  ].join(", "));

  const philosophySceneCopyBlockNodes = $$([
    "body[data-page='philosophy'] #home .home-philosophy-intro .home-copy",
    "body[data-page='philosophy'] #home .home-hero-copy",
    "body[data-page='philosophy'] #home .home-sanctuary-copy",
    "body[data-page='philosophy'] #home .home-shift .home-copy",
    "body[data-page='philosophy'] #home .home-feelings .home-copy",
    "body[data-page='philosophy'] #home .home-mep .home-copy",
    "body[data-page='philosophy'] #home .home-courtyard .home-copy"
  ].join(", "));

  const philosophySceneAuxWrapNodes = $$([
    "body[data-page='philosophy'] #home .home-feelings .home-feeling-wrap"
  ].join(", "));

  const philosophySceneChildNodes = $$([
    "body[data-page='philosophy'] #home .home-philosophy-intro .home-copy > :is(.home-eyebrow, h2, p)",
    "body[data-page='philosophy'] #home .home-hero-copy > :is(.home-eyebrow, h1, .home-subtitle, .home-quiet-line)",
    "body[data-page='philosophy'] #home .home-sanctuary-copy > :is(.home-eyebrow, h2, p)",
    "body[data-page='philosophy'] #home :is(.home-shift, .home-feelings, .home-mep, .home-courtyard) .home-copy > :is(.home-eyebrow, h2, p, .home-note)"
  ].join(", "));

  const philosophySceneMediaNodes = $$([
    "body[data-page='philosophy'] #home .home-philosophy-intro figure",
    "body[data-page='philosophy'] #home .home-hero-media",
    "body[data-page='philosophy'] #home .home-sanctuary-media",
    "body[data-page='philosophy'] #home .home-shift .home-image",
    "body[data-page='philosophy'] #home .home-feelings .home-image",
    "body[data-page='philosophy'] #home .home-mep .home-image",
    "body[data-page='philosophy'] #home .home-courtyard .home-image"
  ].join(", "));

  const philosophyBodyParagraphNodes = $$([
    "body[data-page='philosophy'] #home .home-philosophy-intro .home-copy > p:not(.home-eyebrow)",
    "body[data-page='philosophy'] #home .home-hero-copy > :is(.home-subtitle, .home-quiet-line, p, .home-note)",
    "body[data-page='philosophy'] #home .home-sanctuary-copy > p:not(.home-eyebrow)",
    "body[data-page='philosophy'] #home :is(.home-shift, .home-feelings, .home-mep, .home-courtyard) .home-copy > :is(p, .home-note):not(.home-eyebrow)",
    "body[data-page='philosophy'] #home .home-philosophy-closing > span",
    "body[data-page='philosophy'] #dimensions .dimension-content :is(p, blockquote)"
  ].join(", "));

  setLockedStyles(philosophyHeadingNodes, {
    "font-size": isMobile ? TYPOGRAPHY_LOCK.mobile.h2 : TYPOGRAPHY_LOCK.h2.fontSize,
    "line-height": TYPOGRAPHY_LOCK.h2.lineHeight,
    "letter-spacing": TYPOGRAPHY_LOCK.h2.letterSpacing,
    "font-family": "\"Noto Serif SC\", \"Songti SC\", serif",
    "font-weight": "500",
    "word-break": "keep-all",
    "overflow-wrap": "normal",
    "text-wrap": "pretty"
  });

  setLockedStyles(philosophyBodyNodes, {
    "font-family": "\"PingFang SC\", \"Noto Sans SC\", sans-serif",
    "font-weight": "400",
    "word-break": "keep-all",
    "overflow-wrap": "normal",
    "text-wrap": "pretty"
  });

  setLockedStyles(philosophyEyebrowNodes, {
    "font-family": "Inter, \"PingFang SC\", sans-serif",
    "font-weight": "450",
    "font-size": isMobile ? "11px" : "12px",
    "letter-spacing": "0.14em",
    "color": "rgba(31, 72, 67, 0.62)"
  });

  setLockedStyles(philosophyTitleNodes, {
    "color": "#193f39",
    "font-size": isMobile ? "clamp(19px, 4.9vw, 22px)" : "clamp(24px, 1.62vw, 27px)",
    "line-height": isMobile ? "1.42" : "1.46",
    "letter-spacing": "-0.02em",
    "text-rendering": "optimizeLegibility"
  });

  setLockedStyles(philosophyCopyNodes, {
    "color": "rgba(38, 34, 30, 0.72)",
    "font-size": isMobile ? "clamp(14px, 3.9vw, 15px)" : "clamp(15px, 0.96vw, 15.5px)",
    "line-height": isMobile ? "1.9" : "1.92",
    "letter-spacing": "0.008em",
    "text-rendering": "optimizeLegibility"
  });

  setLockedStyles(philosophyIntroCopyNodes, {
    "max-width": philosophyRule.copyWidth
  });

  setLockedStyles(philosophySceneCopyNodes, {
    "max-width": philosophyRule.copyWidth
  });

  setLockedStyles(philosophyHeadingNodes, {
    "max-width": philosophyRule.titleWidth
  });

  setLockedStyles(philosophyPanelNodes, {
    "margin-top": philosophyRule.panelMarginTop
  });

  setLockedStyles(philosophyScenePanelNodes, {
    "display": "flex",
    "flex-direction": "column",
    "gap": philosophyRule.panelGap,
    "align-items": "stretch"
  });

  setLockedStyles(philosophyScenePanelNodes, {
    "padding": "0px",
    "padding-top": "0",
    "padding-bottom": "0",
    "padding-left": "0px",
    "padding-right": "0px",
    "padding-inline": "0px",
    "margin-bottom": "0",
    "min-height": "0",
    "box-sizing": "border-box"
  });

  setLockedStyles(philosophySceneCopyBlockNodes, {
    "width": "100%",
    "max-width": "100%",
    "display": "grid",
    "gap": philosophyRule.copyGap,
    "margin": "0",
    "padding": "0",
    "justify-items": "start",
    "align-content": "start",
    "text-align": "left",
    "order": "1"
  });

  setLockedStyles(philosophySceneMediaNodes, {
    "width": "100%",
    "max-width": "100%",
    "order": "2"
  });

  setLockedStyles(philosophySceneAuxWrapNodes, {
    "width": "100%",
    "max-width": "100%",
    "display": "block",
    "margin": "0",
    "padding": "0",
    "order": "2"
  });

  setLockedStyles(philosophySceneChildNodes, {
    "margin": "0"
  });

  setLockedStyles(philosophyBodyParagraphNodes, {
    "margin": "0",
    "line-height": philosophyRule.bodyLineHeight,
    "letter-spacing": philosophyRule.bodyLetterSpacing
  });

  setLockedStyles($$("body[data-page='philosophy'] #home > .home-philosophy-intro"), {
    "margin-top": philosophyRule.firstPanelMarginTop
  });

  setLockedStyles(philosophyMediaFrameNodes, {
    "width": "100%",
    "max-width": "100%",
    "aspect-ratio": philosophyRule.figureRatio,
    "margin-top": "0",
    "margin-bottom": "0",
    "overflow": "hidden"
  });

  setLockedStyles(philosophyMediaImageNodes, {
    "width": "100%",
    "height": "100%",
    "object-fit": "cover",
    "display": "block",
    "animation-name": "zfSceneImageBreath",
    "animation-duration": "18s",
    "animation-timing-function": "ease-in-out",
    "animation-iteration-count": "infinite",
    "animation-direction": "alternate",
    "animation-play-state": "running",
    "transform-origin": "50% 50%",
    "will-change": "transform"
  });

  setLockedStyles(philosophyDimensionMediaImageNodes, {
    "width": "100%",
    "height": "100%",
    "object-fit": "cover",
    "display": "block",
    "animation-name": "zfSceneImageBreath",
    "animation-duration": "18s",
    "animation-timing-function": "ease-in-out",
    "animation-iteration-count": "infinite",
    "animation-direction": "alternate",
    "animation-play-state": "running",
    "transform-origin": "50% 50%",
    "will-change": "transform"
  });

  const airStandard = {
    titleWidth: "100%",
    copyWidth: "100%",
    titleSize: isMobile ? "clamp(19px, 4.9vw, 22px)" : "clamp(24px, 1.62vw, 27px)",
    titleLineHeight: isMobile ? "1.42" : "1.46",
    bodySize: isMobile ? "clamp(14px, 3.9vw, 15px)" : "clamp(15px, 0.96vw, 15.5px)",
    bodyLineHeight: isMobile ? "1.9" : "1.92",
    eyebrowSize: isMobile ? "14px" : "12px",
    sectionGap: isMobile ? "42px" : "clamp(72px, 6vw, 104px)",
    gridGap: isMobile ? "34px" : "34px",
    sceneGap: isMobile ? "22px" : "clamp(28px, 2.8vw, 42px)",
    copyGap: isMobile ? "12px" : "14px"
  };
  const airTitleNodes = $$([
    "body[data-page='systems'] #climate > .section-heading h2",
    "body[data-page='systems'] #climate .climate-living-copy h3",
    "body[data-page='systems'] #environment-problem .air-system-definition-copy h1",
    "body[data-page='systems'] #systems .scene-content h3",
    "body[data-page='systems'] #systems .systems-closing h3"
  ].join(", "));

  const airBodyNodes = $$([
    "body[data-page='systems'] #climate > .section-heading .lead",
    "body[data-page='systems'] #climate > .section-heading .climate-lead-sub",
    "body[data-page='systems'] #climate .climate-living-copy p:not(.climate-closing-eyebrow)",
    "body[data-page='systems'] #environment-problem .air-system-definition-lead",
    "body[data-page='systems'] #systems .scene-content p:not(.eyebrow)",
    "body[data-page='systems'] #systems .scene-content .card-quote",
    "body[data-page='systems'] #systems .systems-closing p:not(.systems-closing-eyebrow)"
  ].join(", "));

  const airEyebrowNodes = $$([
    "body[data-page='systems'] #climate .eyebrow",
    "body[data-page='systems'] #climate .climate-closing-eyebrow",
    "body[data-page='systems'] #environment-problem .eyebrow",
    "body[data-page='systems'] #systems .scene-content .eyebrow",
    "body[data-page='systems'] #systems .systems-closing-eyebrow"
  ].join(", "));

  const airCopyBlocks = $$([
    "body[data-page='systems'] #climate > .section-heading",
    "body[data-page='systems'] #climate .climate-living-copy",
    "body[data-page='systems'] #environment-problem .air-system-definition-copy",
    "body[data-page='systems'] #systems .scene-content",
    "body[data-page='systems'] #systems .systems-closing"
  ].join(", "));

  const airSectionNodes = $$([
    "body[data-page='systems'] main > #climate",
    "body[data-page='systems'] main > #environment-problem",
    "body[data-page='systems'] main > #environment-logic",
    "body[data-page='systems'] main > #systems"
  ].join(", "));

  const airEnvironmentSection = document.querySelector("body[data-page='systems'] main > #environment-problem");
  const airSystemsSection = document.querySelector("body[data-page='systems'] main > #systems");
  const airSystemGrid = document.querySelector("body[data-page='systems'] main > #systems .system-grid");

  const airScenePanels = $$([
    "body[data-page='systems'] #climate .climate-living-scene",
    "body[data-page='systems'] #systems .system-scene-card"
  ].join(", "));

  const airMediaFrames = $$([
    "body[data-page='systems'] #climate .climate-stage",
    "body[data-page='systems'] #environment-problem .air-opening-scene",
    "body[data-page='systems'] #climate .climate-living-media",
    "body[data-page='systems'] #systems .scene-media"
  ].join(", "));

  const airMediaImages = $$([
    "body[data-page='systems'] #climate .climate-map > img",
    "body[data-page='systems'] #environment-problem .air-opening-scene > img",
    "body[data-page='systems'] #climate .climate-living-media > img",
    "body[data-page='systems'] #systems .scene-media > img"
  ].join(", "));

  const airOpeningTitleSpans = $$("body[data-page='systems'] #environment-problem .air-system-definition-copy h1 span");
  const airLifestyleRibbon = document.querySelector("body[data-page='systems'] #environment-problem .air-lifestyle-ribbon");
  const airLifestyleItems = $$("body[data-page='systems'] #environment-problem .air-lifestyle-ribbon span");
  const airLifestyleLabels = $$("body[data-page='systems'] #environment-problem .air-lifestyle-ribbon strong");
  const airLifestyleIcons = $$("body[data-page='systems'] #environment-problem .air-lifestyle-ribbon svg");

  setLockedStyles(airEyebrowNodes, {
    "font-family": "Inter, \"PingFang SC\", sans-serif",
    "font-size": airStandard.eyebrowSize,
    "font-weight": "450",
    "line-height": "1.45",
    "letter-spacing": "0.14em",
    "color": "rgba(31, 72, 67, 0.62)",
    "padding-left": "4px",
    "margin": "0",
    "overflow": "visible",
    "text-transform": "none"
  });

  setLockedStyles(airTitleNodes, {
    "max-width": airStandard.titleWidth,
    "margin": "0",
    "color": "#193f39",
    "font-family": "\"Noto Serif SC\", \"Songti SC\", serif",
    "font-size": airStandard.titleSize,
    "font-weight": "500",
    "line-height": airStandard.titleLineHeight,
    "letter-spacing": "-0.02em",
    "white-space": "normal",
    "word-break": "keep-all",
    "overflow-wrap": "normal",
    "text-wrap": "pretty",
    "text-rendering": "optimizeLegibility"
  });

  setLockedStyles(airBodyNodes, {
    "max-width": airStandard.copyWidth,
    "margin": "0",
    "color": "rgba(38, 34, 30, 0.72)",
    "font-family": "\"PingFang SC\", \"Noto Sans SC\", sans-serif",
    "font-size": airStandard.bodySize,
    "font-weight": "400",
    "line-height": airStandard.bodyLineHeight,
    "letter-spacing": "0.008em",
    "word-break": "keep-all",
    "overflow-wrap": "normal",
    "text-wrap": "pretty",
    "text-rendering": "optimizeLegibility"
  });

  setLockedStyles(airSectionNodes, {
    "width": isMobile ? "calc(100vw - 36px)" : "calc(100vw - 64px)",
    "max-width": "none",
    "margin-left": "auto",
    "margin-right": "auto",
    "margin-bottom": "0",
    "padding": "0",
    "border": "0",
    "border-radius": "0",
    "background": "transparent",
    "box-shadow": "none",
    "overflow": "visible",
    "box-sizing": "border-box"
  });

  if (airEnvironmentSection) {
    setLockedStyles([airEnvironmentSection], { "margin-top": airStandard.sectionGap });
  }

  if (airSystemsSection) {
    setLockedStyles([airSystemsSection], { "margin-top": airStandard.sectionGap });
  }

  if (airSystemGrid) {
    setLockedStyles([airSystemGrid], {
      "display": "grid",
      "gap": airStandard.gridGap,
      "width": "100%",
      "max-width": "100%",
      "inline-size": "100%",
      "max-inline-size": "100%",
      "margin": "0 0 36px"
    });
  }

  setLockedStyles(airCopyBlocks, {
    "display": "grid",
    "gap": airStandard.copyGap,
    "justify-items": "start",
    "align-content": "start",
    "padding": "0",
    "margin": "0",
    "border": "0",
    "border-radius": "0",
    "background": "transparent",
    "box-shadow": "none",
    "text-align": "left",
    "overflow": "visible"
  });

  setLockedStyles(airOpeningTitleSpans, {
    "display": "inline",
    "font": "inherit",
    "color": "inherit",
    "white-space": "normal"
  });

  if (airLifestyleRibbon) {
    setLockedStyles([airLifestyleRibbon], {
      "display": "grid",
      "grid-template-columns": "repeat(5, minmax(0, 1fr))",
      "gap": "12px",
      "width": "100%",
      "max-width": airStandard.copyWidth,
      "margin": "0",
      "padding": "12px 0",
      "border-top": "1px solid rgba(18, 53, 47, 0.12)",
      "border-bottom": "1px solid rgba(18, 53, 47, 0.12)",
      "border-left": "0",
      "border-right": "0",
      "background": "transparent",
      "box-shadow": "none"
    });
  }

  setLockedStyles(airLifestyleItems, {
    "display": "grid",
    "justify-items": "center",
    "gap": "6px",
    "min-width": "0",
    "padding": "0",
    "border": "0",
    "background": "transparent",
    "box-shadow": "none"
  });

  setLockedStyles(airLifestyleLabels, {
    "color": "#193f39",
    "font-family": "\"PingFang SC\", \"Noto Sans SC\", sans-serif",
    "font-size": "12px",
    "font-weight": "600",
    "line-height": "1.25",
    "letter-spacing": "0"
  });

  setLockedStyles(airLifestyleIcons, {
    "width": "24px",
    "height": "24px",
    "stroke-width": "1.7"
  });

  setLockedStyles(airScenePanels, {
    "display": "flex",
    "flex-direction": "column",
    "align-items": "stretch",
    "gap": airStandard.sceneGap,
    "width": isMobile ? "100%" : "100vw",
    "max-width": isMobile ? "100%" : "100vw",
    "margin-left": isMobile ? "0" : "calc(50% - 50vw)",
    "margin-right": isMobile ? "0" : "calc(50% - 50vw)",
    "padding": "0",
    "margin-top": "0",
    "margin-bottom": "0",
    "border": "0",
    "border-radius": "0",
    "background": "transparent",
    "box-shadow": "none",
    "overflow": "visible"
  });

  setLockedStyles(airMediaFrames, {
    "width": isMobile ? "100%" : "100vw",
    "max-width": isMobile ? "100%" : "100vw",
    "margin-left": isMobile ? "0" : "calc(50% - 50vw)",
    "margin-right": isMobile ? "0" : "calc(50% - 50vw)",
    "aspect-ratio": "16 / 9",
    "min-height": isMobile ? "0" : "clamp(760px, 52vw, 980px)",
    "margin-top": "0",
    "margin-bottom": "0",
    "border-radius": isMobile ? "clamp(22px, 2vw, 30px)" : "0",
    "overflow": "hidden",
    "background": "transparent",
    "box-shadow": "none"
  });

  setLockedStyles(airMediaImages, {
    "display": "block",
    "width": "100%",
    "height": "100%",
    "min-height": isMobile ? "0" : "clamp(760px, 52vw, 980px)",
    "object-fit": "cover",
    "object-position": "50% 50%",
    "border-radius": "inherit"
  });

  const basementStandard = {
    sectionWidth: isMobile ? "calc(100vw - 36px)" : "calc(100vw - 64px)",
    titleWidth: isMobile ? "100%" : "min(100%, 38em)",
    copyWidth: "100%",
    titleSize: isMobile ? "clamp(19px, 4.9vw, 22px)" : "clamp(24px, 1.62vw, 27px)",
    titleLineHeight: isMobile ? "1.42" : "1.46",
    bodySize: isMobile ? "clamp(14px, 3.9vw, 15px)" : "clamp(15px, 0.96vw, 15.5px)",
    bodyLineHeight: isMobile ? "1.9" : "1.92",
    eyebrowSize: isMobile ? "12px" : "12px",
    sectionGap: isMobile ? "42px" : "clamp(72px, 6vw, 104px)",
    sceneGap: isMobile ? "22px" : "clamp(28px, 2.8vw, 42px)",
    copyGap: isMobile ? "12px" : "14px"
  };

  const basementSectionNodes = $$([
    "body[data-page='basement-system'] main > #basement-definition",
    "body[data-page='basement-system'] main > #basement-problem",
    "body[data-page='basement-system'] main > #basement-logic",
    "body[data-page='basement-system'] main > #basement-lifting",
    "body[data-page='basement-system'] main > #basement-sport-layer",
    "body[data-page='basement-system'] main > #basement-reading-layer",
    "body[data-page='basement-system'] main > #basement-dining-layer",
    "body[data-page='basement-system'] main > #basement-tea-room-layer",
    "body[data-page='basement-system'] main > #basement-cigar-layer",
    "body[data-page='basement-system'] main > #basement-wine-layer",
    "body[data-page='basement-system'] main > #basement-game-layer",
    "body[data-page='basement-system'] main > #basement-party-layer",
    "body[data-page='basement-system'] main > #basement-meditation-layer",
    "body[data-page='basement-system'] main > #basement-summary"
  ].join(", "));

  const basementSceneSectionNodes = $$([
    "body[data-page='basement-system'] main > #basement-problem",
    "body[data-page='basement-system'] main > #basement-logic",
    "body[data-page='basement-system'] main > #basement-lifting",
    "body[data-page='basement-system'] main > #basement-sport-layer",
    "body[data-page='basement-system'] main > #basement-reading-layer",
    "body[data-page='basement-system'] main > #basement-dining-layer",
    "body[data-page='basement-system'] main > #basement-tea-room-layer",
    "body[data-page='basement-system'] main > #basement-cigar-layer",
    "body[data-page='basement-system'] main > #basement-wine-layer",
    "body[data-page='basement-system'] main > #basement-game-layer",
    "body[data-page='basement-system'] main > #basement-party-layer",
    "body[data-page='basement-system'] main > #basement-meditation-layer"
  ].join(", "));

  const basementTitleNodes = $$([
    "body[data-page='basement-system'] #basement-definition .basement-definition-copy h1",
    "body[data-page='basement-system'] #basement-definition .basement-journey-head h2",
    "body[data-page='basement-system'] #basement-definition .basement-journey-panel-copy h3",
    "body[data-page='basement-system'] #basement-problem .system-cognition-inner h1",
    "body[data-page='basement-system'] #basement-logic .image-entry-copy h2",
    "body[data-page='basement-system'] #basement-lifting .image-entry-copy h2",
    "body[data-page='basement-system'] .basement-showcase .basement-copy h3",
    "body[data-page='basement-system'] #basement-summary .basement-copy h3",
    "body[data-page='basement-system'] #basement-summary .basement-summary-copy h2",
    "body[data-page='basement-system'] #basement-summary .basement-summary-copy h3"
  ].join(", "));

  const basementBodyNodes = $$([
    "body[data-page='basement-system'] #basement-definition .basement-definition-lead",
    "body[data-page='basement-system'] #basement-definition .basement-journey-head p",
    "body[data-page='basement-system'] #basement-definition .basement-journey-panel-copy p:not(.eyebrow)",
    "body[data-page='basement-system'] #basement-problem .system-cognition-inner > p:not(.eyebrow)",
    "body[data-page='basement-system'] #basement-logic .image-entry-copy p:not(.eyebrow)",
    "body[data-page='basement-system'] #basement-logic .image-entry-copy blockquote",
    "body[data-page='basement-system'] #basement-lifting .image-entry-copy p:not(.eyebrow)",
    "body[data-page='basement-system'] #basement-lifting .image-entry-copy blockquote",
    "body[data-page='basement-system'] .basement-showcase .basement-copy p:not(.eyebrow)",
    "body[data-page='basement-system'] .basement-showcase .basement-copy blockquote",
    "body[data-page='basement-system'] #basement-summary .basement-copy p:not(.eyebrow)",
    "body[data-page='basement-system'] #basement-summary .basement-summary-copy p:not(.eyebrow)"
  ].join(", "));

  const basementEyebrowNodes = $$([
    "body[data-page='basement-system'] #basement-definition .basement-definition-copy > .eyebrow",
    "body[data-page='basement-system'] #basement-definition .basement-journey-kicker",
    "body[data-page='basement-system'] #basement-problem .eyebrow",
    "body[data-page='basement-system'] #basement-logic .eyebrow",
    "body[data-page='basement-system'] #basement-lifting .eyebrow",
    "body[data-page='basement-system'] .basement-showcase .eyebrow",
    "body[data-page='basement-system'] #basement-summary .eyebrow"
  ].join(", "));

  const basementCopyBlocks = $$([
    "body[data-page='basement-system'] #basement-definition .basement-definition-copy",
    "body[data-page='basement-system'] #basement-definition .basement-journey-head",
    "body[data-page='basement-system'] #basement-definition .basement-journey-panel-copy",
    "body[data-page='basement-system'] #basement-problem .system-cognition-inner",
    "body[data-page='basement-system'] #basement-logic .image-entry-copy",
    "body[data-page='basement-system'] #basement-lifting .image-entry-copy",
    "body[data-page='basement-system'] .basement-showcase .basement-copy",
    "body[data-page='basement-system'] #basement-summary .basement-copy",
    "body[data-page='basement-system'] #basement-summary .basement-summary-copy"
  ].join(", "));

  const basementMediaFrames = $$([
    "body[data-page='basement-system'] #basement-definition .basement-context-media",
    "body[data-page='basement-system'] #basement-problem .basement-problem-media",
    "body[data-page='basement-system'] #basement-logic .image-entry-media",
    "body[data-page='basement-system'] #basement-lifting .image-entry-media",
    "body[data-page='basement-system'] .basement-showcase .basement-media"
  ].join(", "));

  const basementMediaImages = $$([
    "body[data-page='basement-system'] #basement-definition .basement-context-media > img",
    "body[data-page='basement-system'] #basement-problem .basement-problem-media > img",
    "body[data-page='basement-system'] #basement-logic .image-entry-media > img",
    "body[data-page='basement-system'] #basement-lifting .image-entry-media > img",
    "body[data-page='basement-system'] .basement-showcase .basement-media > img"
  ].join(", "));

  const basementLifestyleRibbon = document.querySelector("body[data-page='basement-system'] #basement-definition .basement-lifestyle-ribbon");
  const basementLifestyleItems = $$("body[data-page='basement-system'] #basement-definition .basement-lifestyle-ribbon > span");
  const basementLifestyleLabels = $$("body[data-page='basement-system'] #basement-definition .basement-lifestyle-ribbon strong");
  const basementLifestyleIcons = $$("body[data-page='basement-system'] #basement-definition .basement-lifestyle-ribbon svg");

  setLockedStyles(basementSectionNodes, {
    "width": basementStandard.sectionWidth,
    "max-width": "none",
    "margin-left": "auto",
    "margin-right": "auto",
    "margin-bottom": "0",
    "padding": "0",
    "border": "0",
    "border-radius": "0",
    "background": "transparent",
    "box-shadow": "none",
    "overflow": "visible",
    "box-sizing": "border-box"
  });

  setLockedStyles(basementSceneSectionNodes, {
    "display": "flex",
    "flex-direction": "column",
    "align-items": "stretch",
    "gap": basementStandard.sceneGap,
    "margin-top": basementStandard.sectionGap
  });

  setLockedStyles($$("body[data-page='basement-system'] main > #basement-summary"), {
    "margin-top": basementStandard.sectionGap
  });

  setLockedStyles(basementCopyBlocks, {
    "width": "100%",
    "max-width": "100%",
    "display": "grid",
    "gap": basementStandard.copyGap,
    "justify-items": "start",
    "align-content": "start",
    "margin": "0",
    "padding": "0",
    "border": "0",
    "border-radius": "0",
    "background": "transparent",
    "box-shadow": "none",
    "text-align": "left",
    "overflow": "visible"
  });

  setLockedStyles(basementEyebrowNodes, {
    "font-family": "Inter, \"PingFang SC\", sans-serif",
    "font-size": basementStandard.eyebrowSize,
    "font-weight": "450",
    "line-height": "1.45",
    "letter-spacing": "0.14em",
    "color": "rgba(31, 72, 67, 0.62)",
    "padding-left": "4px",
    "margin": "0",
    "overflow": "visible",
    "text-transform": "none"
  });

  setLockedStyles(basementTitleNodes, {
    "display": "block",
    "width": "100%",
    "max-width": basementStandard.titleWidth,
    "min-width": "0",
    "box-sizing": "border-box",
    "margin": "0",
    "color": "#193f39",
    "font-family": "\"Noto Serif SC\", \"Songti SC\", serif",
    "font-size": basementStandard.titleSize,
    "font-weight": "500",
    "line-height": basementStandard.titleLineHeight,
    "letter-spacing": "-0.02em",
    "white-space": "normal",
    "word-break": "normal",
    "overflow-wrap": "break-word",
    "text-wrap": "pretty",
    "text-rendering": "optimizeLegibility"
  });

  setLockedStyles($$("body[data-page='basement-system'] main :is(h1, h2, h3) span"), {
    "display": "inline",
    "font": "inherit",
    "color": "inherit",
    "white-space": "normal"
  });

  setLockedStyles(basementBodyNodes, {
    "display": "block",
    "width": "100%",
    "max-width": basementStandard.copyWidth,
    "min-width": "0",
    "box-sizing": "border-box",
    "margin": "0",
    "color": "rgba(38, 34, 30, 0.72)",
    "font-family": "\"PingFang SC\", \"Noto Sans SC\", sans-serif",
    "font-size": basementStandard.bodySize,
    "font-weight": "400",
    "line-height": basementStandard.bodyLineHeight,
    "letter-spacing": "0.008em",
    "word-break": "normal",
    "overflow-wrap": "break-word",
    "text-wrap": "pretty",
    "text-rendering": "optimizeLegibility"
  });

  if (basementLifestyleRibbon) {
    setLockedStyles([basementLifestyleRibbon], {
      "display": "grid",
      "grid-template-columns": "repeat(6, minmax(0, 1fr))",
      "gap": isMobile ? "10px 6px" : "12px",
      "width": "100%",
      "max-width": "100%",
      "margin": "0",
      "padding": "12px 0",
      "border-top": "1px solid rgba(18, 53, 47, 0.12)",
      "border-bottom": "1px solid rgba(18, 53, 47, 0.12)",
      "border-left": "0",
      "border-right": "0",
      "border-radius": "0",
      "background": "transparent",
      "box-shadow": "none"
    });
  }

  setLockedStyles(basementLifestyleItems, {
    "display": "grid",
    "justify-items": "center",
    "gap": "6px",
    "min-width": "0",
    "padding": "0",
    "border": "0",
    "background": "transparent",
    "box-shadow": "none"
  });

  setLockedStyles(basementLifestyleLabels, {
    "color": "#193f39",
    "font-family": "\"PingFang SC\", \"Noto Sans SC\", sans-serif",
    "font-size": isMobile ? "10px" : "12px",
    "font-weight": "600",
    "line-height": isMobile ? "1.2" : "1.25",
    "letter-spacing": "0",
    "word-break": "keep-all"
  });

  setLockedStyles(basementLifestyleIcons, {
    "width": isMobile ? "21px" : "24px",
    "height": isMobile ? "21px" : "24px",
    "stroke-width": "1.7"
  });

  setLockedStyles(basementMediaFrames, {
    "width": "100%",
    "max-width": "100%",
    "aspect-ratio": "16 / 9",
    "min-height": "0",
    "height": "auto",
    "margin": "0",
    "border-radius": "clamp(22px, 2vw, 30px)",
    "overflow": "hidden",
    "background": "transparent",
    "box-shadow": "none"
  });

  setLockedStyles(basementMediaImages, {
    "display": "block",
    "width": "100%",
    "height": "100%",
    "min-height": "0",
    "object-fit": "cover",
    "object-position": "50% 50%",
    "border-radius": "inherit"
  });

  const waterStandard = {
    sectionWidth: isMobile ? "calc(100vw - 36px)" : "calc(100vw - 64px)",
    titleWidth: "100%",
    copyWidth: "100%",
    titleSize: isMobile ? "clamp(19px, 4.9vw, 22px)" : "clamp(24px, 1.62vw, 27px)",
    titleLineHeight: isMobile ? "1.42" : "1.46",
    bodySize: isMobile ? "clamp(14px, 3.9vw, 15px)" : "clamp(15px, 0.96vw, 15.5px)",
    bodyLineHeight: isMobile ? "1.9" : "1.92",
    eyebrowSize: "12px",
    sectionGap: isMobile ? "42px" : "clamp(72px, 6vw, 104px)",
    sceneGap: isMobile ? "22px" : "clamp(28px, 2.8vw, 42px)",
    copyGap: isMobile ? "12px" : "14px"
  };

  const waterSectionNodes = $$([
    "body[data-page='water-supply-drainage'] main > #water-problem",
    "body[data-page='water-supply-drainage'] main > #water-logic",
    "body[data-page='water-supply-drainage'] main > #water-supply-drainage"
  ].join(", "));

  const waterTitleNodes = $$([
    "body[data-page='water-supply-drainage'] #water-problem h1",
    "body[data-page='water-supply-drainage'] #water-problem .water-system-journey-head h2",
    "body[data-page='water-supply-drainage'] #water-problem .water-system-journey-panel-copy h3",
    "body[data-page='water-supply-drainage'] #water-logic .water-system-signal-summary-copy h2",
    "body[data-page='water-supply-drainage'] #water-supply-drainage .water-proof-copy h3",
    "body[data-page='water-supply-drainage'] #water-supply-drainage .water-proof-closing h3"
  ].join(", "));

  const waterBodyNodes = $$([
    "body[data-page='water-supply-drainage'] #water-problem .water-system-definition-lead",
    "body[data-page='water-supply-drainage'] #water-problem .water-system-journey-head p:not(.water-system-journey-kicker)",
    "body[data-page='water-supply-drainage'] #water-problem .water-system-journey-panel-copy p:not(.eyebrow)",
    "body[data-page='water-supply-drainage'] #water-logic .water-system-signal-summary-copy p:not(.eyebrow)",
    "body[data-page='water-supply-drainage'] #water-supply-drainage .water-proof-copy p:not(.eyebrow)",
    "body[data-page='water-supply-drainage'] #water-supply-drainage .water-proof-closing p:not(.eyebrow)",
    "body[data-page='water-supply-drainage'] #water-problem figcaption"
  ].join(", "));

  const waterEyebrowNodes = $$([
    "body[data-page='water-supply-drainage'] #water-problem .eyebrow",
    "body[data-page='water-supply-drainage'] #water-problem .water-system-journey-kicker",
    "body[data-page='water-supply-drainage'] #water-logic .eyebrow",
    "body[data-page='water-supply-drainage'] #water-supply-drainage .eyebrow"
  ].join(", "));

  const waterCopyBlocks = $$([
    "body[data-page='water-supply-drainage'] #water-problem .water-system-definition-copy",
    "body[data-page='water-supply-drainage'] #water-problem .water-system-journey-head",
    "body[data-page='water-supply-drainage'] #water-problem .water-system-journey-panel-copy",
    "body[data-page='water-supply-drainage'] #water-logic .water-system-signal-summary-copy",
    "body[data-page='water-supply-drainage'] #water-supply-drainage .water-proof-copy",
    "body[data-page='water-supply-drainage'] #water-supply-drainage .water-proof-closing"
  ].join(", "));

  const waterSceneNodes = $$([
    "body[data-page='water-supply-drainage'] #water-problem .water-system-journey",
    "body[data-page='water-supply-drainage'] #water-problem .water-life-bridge",
    "body[data-page='water-supply-drainage'] #water-supply-drainage .water-proof-scene"
  ].join(", "));

  const waterMediaFrames = $$([
    "body[data-page='water-supply-drainage'] #water-problem .water-context-media",
    "body[data-page='water-supply-drainage'] #water-problem .water-life-bridge-media",
    "body[data-page='water-supply-drainage'] #water-supply-drainage .water-proof-media"
  ].join(", "));

  const waterMediaImages = $$([
    "body[data-page='water-supply-drainage'] #water-problem .water-context-media > img",
    "body[data-page='water-supply-drainage'] #water-problem .water-life-bridge-media > img",
    "body[data-page='water-supply-drainage'] #water-supply-drainage .water-proof-media > img"
  ].join(", "));

  const waterLifestyleRibbon = document.querySelector("body[data-page='water-supply-drainage'] #water-problem .water-lifestyle-ribbon");
  const waterLifestyleItems = $$("body[data-page='water-supply-drainage'] #water-problem .water-lifestyle-ribbon > span");
  const waterLifestyleLabels = $$("body[data-page='water-supply-drainage'] #water-problem .water-lifestyle-ribbon strong");
  const waterLifestyleIcons = $$("body[data-page='water-supply-drainage'] #water-problem .water-lifestyle-ribbon svg");

  setLockedStyles(waterSectionNodes, {
    "width": waterStandard.sectionWidth,
    "max-width": "none",
    "margin-left": "auto",
    "margin-right": "auto",
    "margin-bottom": "0",
    "padding": "0",
    "border": "0",
    "border-radius": "0",
    "background": "transparent",
    "box-shadow": "none",
    "overflow": "visible",
    "box-sizing": "border-box"
  });

  setLockedStyles($$("body[data-page='water-supply-drainage'] main > #water-logic, body[data-page='water-supply-drainage'] main > #water-supply-drainage"), {
    "margin-top": waterStandard.sectionGap
  });

  setLockedStyles($$("body[data-page='water-supply-drainage'] main > #water-problem"), {
    "display": "grid",
    "gap": waterStandard.sceneGap
  });

  setLockedStyles($$("body[data-page='water-supply-drainage'] main > #water-supply-drainage"), {
    "display": "flex",
    "flex-direction": "column",
    "align-items": "stretch",
    "gap": waterStandard.sectionGap
  });

  setLockedStyles(waterCopyBlocks, {
    "width": waterStandard.copyWidth,
    "max-width": waterStandard.copyWidth,
    "display": "grid",
    "gap": waterStandard.copyGap,
    "justify-items": "start",
    "align-content": "start",
    "margin-left": "auto",
    "margin-right": "auto",
    "margin-top": "0",
    "margin-bottom": "0",
    "padding": "0",
    "border": "0",
    "border-radius": "0",
    "background": "transparent",
    "box-shadow": "none",
    "text-align": "left",
    "overflow": "visible"
  });

  setLockedStyles($$("body[data-page='water-supply-drainage'] #water-problem .water-system-definition-copy"), {
    "gap": waterStandard.copyGap
  });

  setLockedStyles(waterEyebrowNodes, {
    "max-width": "100%",
    "font-family": "Inter, \"PingFang SC\", sans-serif",
    "font-size": waterStandard.eyebrowSize,
    "font-weight": "450",
    "line-height": "1.45",
    "letter-spacing": "0.14em",
    "color": "rgba(31, 72, 67, 0.62)",
    "padding-left": "4px",
    "margin": "0",
    "overflow": "visible",
    "text-transform": "none"
  });

  setLockedStyles(waterTitleNodes, {
    "display": "block",
    "width": "100%",
    "max-width": waterStandard.titleWidth,
    "min-width": "0",
    "box-sizing": "border-box",
    "margin": "0",
    "color": "#193f39",
    "font-family": "\"Noto Serif SC\", \"Songti SC\", serif",
    "font-size": waterStandard.titleSize,
    "font-weight": "500",
    "line-height": waterStandard.titleLineHeight,
    "letter-spacing": "-0.02em",
    "white-space": "normal",
    "word-break": "normal",
    "overflow-wrap": "break-word",
    "text-wrap": "pretty",
    "text-rendering": "optimizeLegibility"
  });

  setLockedStyles($$("body[data-page='water-supply-drainage'] main :is(h1, h2, h3) span"), {
    "display": "inline",
    "font": "inherit",
    "color": "inherit",
    "white-space": "normal"
  });

  setLockedStyles(waterBodyNodes, {
    "display": "block",
    "width": "100%",
    "max-width": waterStandard.copyWidth,
    "min-width": "0",
    "box-sizing": "border-box",
    "margin": "0",
    "color": "rgba(38, 34, 30, 0.72)",
    "font-family": "\"PingFang SC\", \"Noto Sans SC\", sans-serif",
    "font-size": waterStandard.bodySize,
    "font-weight": "400",
    "line-height": waterStandard.bodyLineHeight,
    "letter-spacing": "0.008em",
    "word-break": "normal",
    "overflow-wrap": "break-word",
    "text-wrap": "pretty",
    "text-rendering": "optimizeLegibility"
  });

  if (waterLifestyleRibbon) {
    setLockedStyles([waterLifestyleRibbon], {
      "display": "grid",
      "grid-template-columns": isMobile ? "repeat(4, minmax(0, 1fr))" : "repeat(8, minmax(0, 1fr))",
      "gap": isMobile ? "10px 6px" : "12px",
      "width": "100%",
      "max-width": "100%",
      "margin": "0",
      "padding": "12px 0",
      "border-top": "1px solid rgba(18, 53, 47, 0.12)",
      "border-bottom": "1px solid rgba(18, 53, 47, 0.12)",
      "border-left": "0",
      "border-right": "0",
      "border-radius": "0",
      "background": "transparent",
      "box-shadow": "none"
    });
  }

  setLockedStyles(waterLifestyleItems, {
    "display": "grid",
    "justify-items": "center",
    "gap": "6px",
    "min-width": "0",
    "padding": "0",
    "border": "0",
    "background": "transparent",
    "box-shadow": "none"
  });

  setLockedStyles(waterLifestyleLabels, {
    "color": "#193f39",
    "font-family": "\"PingFang SC\", \"Noto Sans SC\", sans-serif",
    "font-size": isMobile ? "10px" : "12px",
    "font-weight": "600",
    "line-height": isMobile ? "1.2" : "1.25",
    "letter-spacing": "0",
    "word-break": "keep-all"
  });

  setLockedStyles(waterLifestyleIcons, {
    "width": isMobile ? "21px" : "24px",
    "height": isMobile ? "21px" : "24px",
    "stroke-width": "1.7"
  });

  setLockedStyles(waterSceneNodes, {
    "display": "flex",
    "flex-direction": "column",
    "align-items": "stretch",
    "gap": waterStandard.sceneGap,
    "width": isMobile ? "100%" : "100vw",
    "max-width": isMobile ? "100%" : "100vw",
    "margin-top": "0",
    "margin-bottom": "0",
    "margin-left": isMobile ? "0" : "calc(50% - 50vw)",
    "margin-right": isMobile ? "0" : "calc(50% - 50vw)",
    "padding": isMobile ? "0" : "0 clamp(24px, 2vw, 36px)",
    "border": "0",
    "border-radius": "0",
    "background": "transparent",
    "box-shadow": "none",
    "overflow": "visible",
    "box-sizing": "border-box"
  });

  setLockedStyles(waterMediaFrames, {
    "width": isMobile ? "100%" : "100vw",
    "max-width": isMobile ? "100%" : "100vw",
    "aspect-ratio": "16 / 9",
    "min-height": isMobile ? "0" : "clamp(760px, 52vw, 980px)",
    "height": isMobile ? "auto" : "clamp(760px, 52vw, 980px)",
    "margin-top": "0",
    "margin-bottom": "0",
    "margin-left": isMobile ? "0" : "calc(50% - 50vw)",
    "margin-right": isMobile ? "0" : "calc(50% - 50vw)",
    "padding-left": "0",
    "padding-right": "0",
    "box-sizing": "border-box",
    "border-radius": isMobile ? "clamp(22px, 2vw, 30px)" : "0",
    "overflow": "hidden",
    "background": "transparent",
    "box-shadow": "none"
  });

  setLockedStyles(waterMediaImages, {
    "display": "block",
    "width": "100%",
    "height": "100%",
    "min-height": isMobile ? "0" : "clamp(760px, 52vw, 980px)",
    "object-fit": "cover",
    "object-position": "50% 50%",
    "border-radius": "inherit"
  });

  const deliveryStandard = {
    sectionWidth: isMobile ? "calc(100vw - 36px)" : "calc(100vw - 64px)",
    titleWidth: "100%",
    copyWidth: "100%",
    titleSize: isMobile ? "clamp(19px, 4.9vw, 22px)" : "clamp(24px, 1.62vw, 27px)",
    titleLineHeight: isMobile ? "1.42" : "1.46",
    bodySize: isMobile ? "clamp(14px, 3.9vw, 15px)" : "clamp(15px, 0.96vw, 15.5px)",
    bodyLineHeight: isMobile ? "1.9" : "1.92",
    eyebrowSize: "12px",
    sectionGap: isMobile ? "42px" : "clamp(72px, 6vw, 104px)",
    sceneGap: isMobile ? "22px" : "clamp(28px, 2.8vw, 42px)",
    copyGap: isMobile ? "12px" : "14px"
  };

  const deliverySections = $$([
    "body[data-page='delivery'] main > #fit",
    "body[data-page='delivery'] main > #constraints",
    "body[data-page='delivery'] main > #integration",
    "body[data-page='delivery'] main > #delivery",
    "body[data-page='delivery'] main > #team-execution",
    "body[data-page='delivery'] main > #process"
  ].join(", "));

  const deliveryCopyBlocks = $$([
    "body[data-page='delivery'] main > #fit > .section-copy",
    "body[data-page='delivery'] main > #constraints > .section-copy",
    "body[data-page='delivery'] main > #integration > .section-copy",
    "body[data-page='delivery'] main > #delivery > .section-copy",
    "body[data-page='delivery'] main > #team-execution > .section-copy",
    "body[data-page='delivery'] main > #process > .section-copy"
  ].join(", "));

  const deliveryTitleNodes = $$("body[data-page='delivery'] main > :is(#fit, #constraints, #integration, #delivery, #team-execution, #process) .section-copy > h2");
  const deliveryBodyNodes = $$([
    "body[data-page='delivery'] main > :is(#fit, #constraints, #integration, #delivery, #team-execution, #process) .section-copy > p:not(.eyebrow)",
    "body[data-page='delivery'] main > :is(#fit, #constraints, #integration, #delivery, #team-execution, #process) .section-copy > blockquote",
    "body[data-page='delivery'] main > #process > .section-bridge"
  ].join(", "));
  const deliveryEyebrowNodes = $$("body[data-page='delivery'] main > :is(#fit, #constraints, #integration, #delivery, #team-execution, #process) .section-copy > .eyebrow");
  const deliveryMediaFrames = $$("body[data-page='delivery'] .delivery-scene-media");
  const deliveryMediaImages = $$("body[data-page='delivery'] .delivery-scene-media > img");
  const deliveryGrid = document.querySelector("body[data-page='delivery'] #delivery .delivery-grid");
  const deliveryCardsNodes = $$("body[data-page='delivery'] #delivery .delivery-card");
  const deliveryCardTitles = $$("body[data-page='delivery'] #delivery .delivery-card h3");
  const deliveryCardText = $$("body[data-page='delivery'] #delivery .delivery-card p");

  setLockedStyles(deliverySections, {
    "box-sizing": "border-box",
    "width": deliveryStandard.sectionWidth,
    "max-width": "none",
    "min-height": "0",
    "margin-left": "auto",
    "margin-right": "auto",
    "margin-bottom": "0",
    "padding": "0",
    "border": "0",
    "border-radius": "0",
    "background": "transparent",
    "box-shadow": "none",
    "overflow": "visible"
  });

  setLockedStyles($$("body[data-page='delivery'] main > :is(#constraints, #integration, #delivery, #team-execution, #process)"), {
    "margin-top": deliveryStandard.sectionGap
  });

  setLockedStyles(deliveryCopyBlocks, {
    "width": "100%",
    "max-width": "100%",
    "display": "grid",
    "gap": deliveryStandard.copyGap,
    "justify-items": "start",
    "align-content": "start",
    "margin": "0",
    "padding": "0",
    "border": "0",
    "border-radius": "0",
    "background": "transparent",
    "box-shadow": "none",
    "text-align": "left",
    "overflow": "visible"
  });

  setLockedStyles(deliveryEyebrowNodes, {
    "max-width": "100%",
    "font-family": "Inter, \"PingFang SC\", sans-serif",
    "font-size": deliveryStandard.eyebrowSize,
    "font-weight": "450",
    "line-height": "1.45",
    "letter-spacing": "0.14em",
    "color": "rgba(31, 72, 67, 0.62)",
    "padding-left": "4px",
    "margin": "0",
    "overflow": "visible",
    "text-transform": "none"
  });

  setLockedStyles(deliveryTitleNodes, {
    "display": "block",
    "width": "100%",
    "max-width": deliveryStandard.titleWidth,
    "min-width": "0",
    "box-sizing": "border-box",
    "margin": "0",
    "color": "#193f39",
    "font-family": "\"Noto Serif SC\", \"Songti SC\", serif",
    "font-size": deliveryStandard.titleSize,
    "font-weight": "500",
    "line-height": deliveryStandard.titleLineHeight,
    "letter-spacing": "-0.02em",
    "white-space": "normal",
    "word-break": "normal",
    "overflow-wrap": "break-word",
    "text-wrap": "pretty",
    "text-rendering": "optimizeLegibility"
  });

  setLockedStyles(deliveryBodyNodes, {
    "display": "block",
    "width": "100%",
    "max-width": deliveryStandard.copyWidth,
    "min-width": "0",
    "box-sizing": "border-box",
    "margin": "0",
    "color": "rgba(38, 34, 30, 0.72)",
    "font-family": "\"PingFang SC\", \"Noto Sans SC\", sans-serif",
    "font-size": deliveryStandard.bodySize,
    "font-weight": "400",
    "line-height": deliveryStandard.bodyLineHeight,
    "letter-spacing": "0.008em",
    "word-break": "normal",
    "overflow-wrap": "break-word",
    "text-wrap": "pretty",
    "text-rendering": "optimizeLegibility"
  });

  setLockedStyles($$("body[data-page='delivery'] main > :is(#fit, #constraints, #integration, #delivery, #team-execution, #process) .section-copy > blockquote"), {
    "color": "rgba(25, 63, 57, 0.76)",
    "font-family": "\"Noto Serif SC\", \"Songti SC\", serif",
    "font-weight": "500",
    "border-left": "0",
    "padding": "0"
  });

  setLockedStyles(deliveryMediaFrames, {
    "width": "100%",
    "max-width": "100%",
    "aspect-ratio": "16 / 9",
    "min-height": "0",
    "height": "auto",
    "margin": `${deliveryStandard.sceneGap} 0 0`,
    "border-radius": "clamp(22px, 2vw, 30px)",
    "overflow": "hidden",
    "background": "transparent",
    "box-shadow": "none"
  });

  setLockedStyles(deliveryMediaImages, {
    "display": "block",
    "width": "100%",
    "height": "100%",
    "min-height": "0",
    "object-fit": "cover",
    "object-position": "50% 50%",
    "border-radius": "inherit"
  });

  if (deliveryGrid) {
    setLockedStyles([deliveryGrid], {
      "display": "grid",
      "grid-template-columns": isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))",
      "gap": "14px",
      "width": "100%",
      "max-width": "100%",
      "margin": "0",
      "padding": "0"
    });
  }

  setLockedStyles(deliveryCardsNodes, {
    "min-width": "0",
    "margin": "0",
    "padding": "18px",
    "border": "1px solid rgba(25, 63, 57, 0.12)",
    "border-radius": "8px",
    "background": "rgba(255, 252, 246, 0.56)",
    "box-shadow": "none"
  });

  setLockedStyles(deliveryCardTitles, {
    "margin": "0",
    "color": "#193f39",
    "font-family": "\"Noto Serif SC\", \"Songti SC\", serif",
    "font-size": isMobile ? "17px" : "clamp(18px, 1.08vw, 20px)",
    "font-weight": "500",
    "line-height": "1.46",
    "letter-spacing": "-0.01em"
  });

  setLockedStyles(deliveryCardText, {
    "margin": "0",
    "color": "rgba(38, 34, 30, 0.72)",
    "font-family": "\"PingFang SC\", \"Noto Sans SC\", sans-serif",
    "font-size": isMobile ? "14px" : "clamp(14px, 0.9vw, 15px)",
    "line-height": "1.82",
    "letter-spacing": "0.006em"
  });

  const finalRouteRule = {
    sectionWidth: isMobile ? "calc(100vw - 36px)" : "calc(100vw - 64px)",
    topPadding: isMobile ? "42px" : "clamp(56px, 5.4vw, 84px)",
    sceneGap: isMobile ? "24px" : "clamp(42px, 4vw, 58px)",
    copyGap: isMobile ? "12px" : "14px",
    titleSize: isMobile ? "clamp(19px, 4.9vw, 22px)" : "clamp(24px, 1.62vw, 27px)",
    titleLineHeight: isMobile ? "1.42" : "1.46",
    bodySize: isMobile ? "clamp(14px, 3.9vw, 15px)" : "clamp(15px, 0.96vw, 15.5px)",
    bodyLineHeight: isMobile ? "1.9" : "1.86",
    eyebrowSize: "12px"
  };

  const finalRouteSections = $$([
    "body[data-page='systems'] main > #climate",
    "body[data-page='basement-system'] main > #basement-definition",
    "body[data-page='water-supply-drainage'] main > #water-problem",
    "body[data-page='delivery'] main > #fit"
  ].join(", "));

  setLockedStyles(finalRouteSections, {
    "box-sizing": "border-box",
    "width": finalRouteRule.sectionWidth,
    "max-width": "none",
    "margin-left": "auto",
    "margin-right": "auto",
    "margin-bottom": "0",
    "padding": "0",
    "padding-top": finalRouteRule.topPadding,
    "border": "0",
    "border-radius": "0",
    "background": "transparent",
    "box-shadow": "none",
    "overflow": "visible",
    "scroll-margin-top": "112px"
  });

  setLockedStyles($$([
    "body[data-page='systems'] main > #climate",
    "body[data-page='basement-system'] main > #basement-definition",
    "body[data-page='water-supply-drainage'] main > #water-problem"
  ].join(", ")), {
    "display": "grid",
    "gap": finalRouteRule.sceneGap,
    "align-content": "start",
    "justify-items": "stretch"
  });

  setLockedStyles($$([
    "body[data-page='systems'] main > #climate > .section-heading",
    "body[data-page='basement-system'] main > #basement-definition .basement-definition-copy",
    "body[data-page='water-supply-drainage'] main > #water-problem .water-system-definition-copy",
    "body[data-page='delivery'] main > #fit > .section-copy"
  ].join(", ")), {
    "width": "100%",
    "max-width": "100%",
    "display": "grid",
    "gap": finalRouteRule.copyGap,
    "justify-items": "start",
    "align-content": "start",
    "margin": "0",
    "padding": "0",
    "text-align": "left"
  });

  setLockedStyles($$([
    "body[data-page='water-supply-drainage'] main > #water-problem .water-system-definition-copy",
    "body[data-page='water-supply-drainage'] #water-system-simulator-entry .water-system-simulator-intro",
    "body[data-page='water-supply-drainage'] #water-system-simulator-entry .water-system-simulator-heading",
    "body[data-page='water-supply-drainage'] #water-system-simulator-entry .water-system-sim-copy",
    "body[data-page='water-supply-drainage'] #water-supply-drainage .water-proof-copy",
    "body[data-page='water-supply-drainage'] #water-supply-drainage .water-proof-closing"
  ].join(", ")), {
    "padding-left": isMobile ? "0" : "clamp(24px, 2vw, 36px)",
    "padding-right": isMobile ? "0" : "clamp(24px, 2vw, 36px)",
    "box-sizing": "border-box"
  });

  setLockedStyles($$([
    "body[data-page='systems'] main > #climate > .section-heading > :is(.eyebrow, h2, p)",
    "body[data-page='basement-system'] main > #basement-definition .basement-definition-copy > :is(.eyebrow, h1, p)",
    "body[data-page='water-supply-drainage'] main > #water-problem .water-system-definition-copy > :is(.eyebrow, h1, p)",
    "body[data-page='delivery'] main > #fit > .section-copy > :is(.eyebrow, h2, p, blockquote)"
  ].join(", ")), {
    "margin": "0",
    "max-width": "100%",
    "text-align": "left"
  });

  setLockedStyles($$([
    "body[data-page='systems'] main > #climate > .section-heading h2",
    "body[data-page='basement-system'] main > #basement-definition .basement-definition-copy h1",
    "body[data-page='water-supply-drainage'] main > #water-problem .water-system-definition-copy h1",
    "body[data-page='delivery'] main > #fit > .section-copy h2"
  ].join(", ")), {
    "color": "#ffffff",
    "font-family": "\"SF Pro Display\", \"PingFang SC\", \"Noto Sans SC\", sans-serif",
    "width": isMobile ? "auto" : "min(900px, 100%)",
    "max-width": isMobile ? "100%" : "900px",
    "font-size": isMobile ? "clamp(30px, 7.8vw, 36px)" : "clamp(38px, 3.15vw, 56px)",
    "font-weight": "600",
    "line-height": "1.16",
    "letter-spacing": "-0.02em",
    "word-break": "normal",
    "overflow-wrap": "break-word",
    "text-wrap": "pretty",
    "text-rendering": "optimizeLegibility"
  });

  setLockedStyles($$("body[data-page='delivery'] main > #fit > .section-copy h2"), {
    "width": isMobile ? "auto" : "min(720px, 100%)",
    "max-width": isMobile ? "100%" : "720px",
    "font-size": isMobile ? "clamp(30px, 7.8vw, 36px)" : "clamp(38px, 3.15vw, 56px)",
    "line-height": "1.16",
    "word-break": "normal",
    "overflow-wrap": "break-word"
  });

  setLockedStyles($$([
    "body[data-page='basement-system'] main > #basement-definition .basement-definition-copy h1",
    "body[data-page='water-supply-drainage'] main > #water-problem .water-system-definition-copy h1"
  ].join(", ")), {
    "width": isMobile ? "auto" : "min(820px, 100%)",
    "max-width": isMobile ? "100%" : "820px",
    "font-size": isMobile ? "clamp(29px, 7.2vw, 34px)" : "clamp(34px, 2.75vw, 50px)",
    "line-height": "1.18"
  });

  setLockedStyles($$([
    "body[data-page='systems'] main > #climate > .section-heading :is(.lead, .climate-lead-sub)",
    "body[data-page='basement-system'] main > #basement-definition .basement-definition-lead",
    "body[data-page='water-supply-drainage'] main > #water-problem .water-system-definition-lead",
    "body[data-page='delivery'] main > #fit > .section-copy > p:not(.eyebrow)",
    "body[data-page='delivery'] main > #fit > .section-copy > blockquote"
  ].join(", ")), {
    "color": "rgba(255, 255, 255, 0.74)",
    "font-family": "\"PingFang SC\", \"Noto Sans SC\", sans-serif",
    "width": isMobile ? "100%" : "min(720px, 100%)",
    "max-width": isMobile ? "100%" : "720px",
    "font-size": isMobile ? "15px" : "clamp(15px, 1.05vw, 18px)",
    "font-weight": "400",
    "line-height": "1.85",
    "letter-spacing": "0.008em",
    "word-break": "normal",
    "overflow-wrap": "break-word",
    "text-wrap": "pretty",
    "text-rendering": "optimizeLegibility"
  });

  setLockedStyles($$([
    "body[data-page='basement-system'] main > #basement-definition .basement-definition-lead",
    "body[data-page='water-supply-drainage'] main > #water-problem .water-system-definition-lead"
  ].join(", ")), {
    "width": isMobile ? "100%" : "min(640px, 100%)",
    "max-width": isMobile ? "100%" : "640px",
    "line-height": "1.75"
  });

  setLockedStyles($$([
    "body[data-page='systems'] main > #climate .eyebrow",
    "body[data-page='basement-system'] main > #basement-definition .eyebrow",
    "body[data-page='water-supply-drainage'] main > #water-problem .eyebrow",
    "body[data-page='delivery'] main > #fit .eyebrow"
  ].join(", ")), {
    "color": "#7ce9f2",
    "font-family": "Inter, \"PingFang SC\", sans-serif",
    "font-size": finalRouteRule.eyebrowSize,
    "font-weight": "450",
    "line-height": "1.45",
    "letter-spacing": "0.14em",
    "text-transform": "none"
  });

  setLockedStyles($$([
    "body[data-page='systems'] main > #climate .climate-stage",
    "body[data-page='basement-system'] main > #basement-definition .basement-context-media",
    "body[data-page='water-supply-drainage'] main > #water-problem .water-context-media"
  ].join(", ")), {
    "width": "100%",
    "max-width": "100%",
    "margin": "0",
    "aspect-ratio": "16 / 9",
    "border-radius": "clamp(22px, 2vw, 30px)",
    "overflow": "hidden"
  });

  setLockedStyles(
    $$("body[data-page='basement-system'] main > #basement-definition .basement-context-media--ground"),
    {
      "aspect-ratio": isMobile ? "16 / 9" : "16 / 10"
    }
  );

  setLockedStyles($$("body[data-page='systems'] main #climate > .section-heading h2"), {
    "max-width": isMobile ? "100%" : "900px",
    "font-size": isMobile ? "clamp(30px, 7.8vw, 36px)" : "clamp(38px, 3.15vw, 56px)",
    "line-height": "1.16"
  });

  setLockedStyles($$("body[data-page='delivery'] main > #fit > .section-copy"), {
    "min-height": isMobile ? "0" : "clamp(590px, 49vw, 760px)",
    "padding": isMobile
      ? "0 0 38px"
      : "clamp(46px, 6vw, 92px) 0 clamp(46px, 6vw, 92px) clamp(46px, 6vw, 92px)",
    "overflow": "hidden",
    "border-radius": isMobile ? "24px" : "clamp(24px, 2.4vw, 36px)",
    "color": "#ffffff",
    "background": "radial-gradient(circle at 8% 12%, rgba(57, 99, 255, 0.24), transparent 28%), #111a2a",
    "box-shadow": "0 34px 90px rgba(17, 26, 42, 0.16)"
  });

  setLockedStyles($$("body[data-page='delivery'] main > #fit > .section-copy > :not(figure)"), {
    "grid-column": "1",
    "width": isMobile ? "auto" : "min(500px, 100%)",
    "max-width": isMobile ? "none" : "500px",
    "margin-left": isMobile ? "28px" : "0",
    "margin-right": isMobile ? "28px" : "clamp(28px, 4vw, 64px)"
  });

  setLockedStyles($$("body[data-page='project-access'] #project-access .project-access-ref-hero img"), {
    "position": "absolute",
    "inset": "0",
    "display": "block",
    "width": "100%",
    "height": "100%",
    "max-height": "none",
    "object-fit": "cover"
  });

  setLockedStyles($$("body[data-page='project-access'] #project-access .project-access-ref-intro h1"), {
    "color": "#172232",
    "font-family": "\"SF Pro Display\", \"PingFang SC\", sans-serif",
    "font-size": isMobile ? "clamp(30px, 7.8vw, 36px)" : "clamp(38px, 3.15vw, 56px)",
    "font-weight": "600",
    "line-height": "1.16",
    "letter-spacing": "-0.02em"
  });

  setLockedStyles($$("body[data-page='project-access'] #project-access .project-access-ref-intro p"), {
    "max-width": "580px",
    "margin": "0",
    "color": "rgba(23, 34, 50, 0.68)",
    "font-size": isMobile ? "14px" : "clamp(15px, 1.05vw, 17px)",
    "line-height": "1.8"
  });

  // The delivery opening has its own editorial layout. Clear the accumulated
  // legacy inline locks so the route-specific stylesheet remains authoritative.
  const deliveryOpening = document.querySelector("body[data-page='delivery'] main > #fit.delivery-prelude");
  if (deliveryOpening) {
    deliveryOpening.removeAttribute("style");
    deliveryOpening.querySelectorAll("*").forEach((node) => node.removeAttribute("style"));
  }
};

const applyPageCohesionInlineLock = () => {
  const compact = window.matchMedia("(max-width: 760px)").matches;

  setLockedStyles($$("body[data-page='systems'] main #climate > .section-heading h2"), {
    "max-width": compact ? "100%" : "900px",
    "font-size": compact ? "clamp(30px, 7.8vw, 36px)" : "clamp(38px, 3.15vw, 56px)",
    "line-height": "1.16"
  });

  setLockedStyles($$("body[data-page='project-access'] #project-access .project-access-ref-hero img"), {
    "position": "absolute",
    "inset": "0",
    "display": "block",
    "width": "100%",
    "height": "100%",
    "max-height": "none",
    "object-fit": "cover"
  });

  setLockedStyles($$("body[data-page='project-access'] #project-access .project-access-ref-intro h1"), {
    "color": "#172232",
    "font-family": "\"SF Pro Display\", \"PingFang SC\", sans-serif",
    "font-size": compact ? "clamp(30px, 7.8vw, 36px)" : "clamp(38px, 3.15vw, 56px)",
    "font-weight": "600",
    "line-height": "1.16",
    "letter-spacing": "-0.02em"
  });

  setLockedStyles($$("body[data-page='project-access'] #project-access .project-access-ref-intro h1 span"), {
    "display": "block",
    "margin-top": "10px",
    "color": "#396df1",
    "font-size": "12px",
    "letter-spacing": "0.12em"
  });

  setLockedStyles($$("body[data-page='project-access'] #project-access .project-access-ref-intro p"), {
    "max-width": "580px",
    "margin": "0",
    "color": "rgba(23, 34, 50, 0.68)",
    "font-size": compact ? "14px" : "clamp(15px, 1.05vw, 17px)",
    "line-height": "1.8"
  });

  const deliveryOpening = document.querySelector("body[data-page='delivery'] main > #fit.delivery-prelude");
  if (deliveryOpening) {
    deliveryOpening.removeAttribute("style");
    deliveryOpening.querySelectorAll("*").forEach((node) => node.removeAttribute("style"));
  }
};

const positionPhilosophyCases = () => {
  const dimensionsSection = document.querySelector("#dimensions");
  const capabilitiesSection = document.querySelector("#home-capabilities");
  const casesSection = document.querySelector("#philosophy-cases");
  if (!dimensionsSection || !capabilitiesSection || !casesSection) return;
  dimensionsSection.insertAdjacentElement("afterend", capabilitiesSection);
  capabilitiesSection.insertAdjacentElement("afterend", casesSection);
};

const applyHeadingHierarchyLock = () => {
  const page = document.body.dataset.page;
  const lock = (selector, size, lineHeight = "1.14") => {
    document.querySelectorAll(selector).forEach((node) => {
      node.style.setProperty("font-size", size, "important");
      node.style.setProperty("line-height", lineHeight, "important");
    });
  };

  if (page === "home") {
    lock("#landing .zf-home-hero-copy h1", "clamp(40px, 3.9vw, 58px)", "1.1");
    lock([
      "#landing > .zf-home-large-home h2",
      "#landing > .zf-home-nourish h2",
      "#landing > .zf-home-health-comfort h2",
      "#landing > .zf-home-narrative-bridge h2",
      "#landing > .zf-home-proof-bridge h2",
      "#landing > .zf-home-system-reveal h2",
      "#landing > .zf-home-capabilities h2",
      "#landing #home-capabilities h2"
    ].join(","), "clamp(32px, 3vw, 40px)");
  }

  if (page === "philosophy") {
    lock("#home h1", "clamp(42px, 4vw, 56px)", "1.1");
    lock([
      "#home h2",
      "#dimensions > .section-heading h2",
      "#home-capabilities h2",
      "#philosophy-cases h2"
    ].join(","), "clamp(30px, 3vw, 40px)", "1.16");
    lock("#philosophy-cases h3", "clamp(26px, 2.5vw, 34px)", "1.18");
  }

  if (page === "systems") {
    lock("#climate > .section-heading h2, #climate .climate-stage h2", "clamp(38px, 3.6vw, 48px)", "1.12");
    lock("main > section:not(#climate) h1, main > section:not(#climate) h2", "clamp(30px, 2.9vw, 38px)", "1.16");
  }

  if (page === "delivery") {
    lock("#fit .delivery-hero-copy h2", "clamp(40px, 3.8vw, 52px)", "1.12");
    lock("#fit h2, main > section:not(#fit) h1, main > section:not(#fit) h2", "clamp(28px, 2.7vw, 36px)", "1.16");
    lock("#fit .delivery-hero-copy h2", "clamp(40px, 3.8vw, 52px)", "1.12");
  }
};

renderDimensions();
positionPhilosophyCases();
renderClimateCards();
initClimateTopicToggles();
renderWaterSupply();
renderWaterScenePhones();
renderSystems();
renderDeliveryCards();
initNav();
initHeroCarousel();
initWeather();
initReveal();
initBasementJourney();
initWaterJourney();
initPageRouter();
initPageStoryRail();
initBasementAlerts();
initBasementSimulator();
initAirEnvironmentSimulator();
initWaterSimulator();
initAdaptiveText();
lockWaterRouteLayout();
initAccessForms();
applyGlobalTypographyLock();
applyPageCohesionInlineLock();
applyHeadingHierarchyLock();

$$("[data-temp], [data-rh], [data-dew-input]").forEach((input) => input.addEventListener("input", updateDewTool));
let typographyLockTimer = null;
const scheduleTypographyLock = (delay = 60) => {
  // The delivery route is owned by global-structure-v1.js. Reapplying this
  // legacy lock after load makes its first paint differ from the settled page.
  if (document.body.dataset.page === "delivery") return;
  if (typographyLockTimer) {
    window.clearTimeout(typographyLockTimer);
  }
  typographyLockTimer = window.setTimeout(() => {
    typographyLockTimer = null;
    requestAnimationFrame(() => {
      applyGlobalTypographyLock();
      applyPageCohesionInlineLock();
      applyHeadingHierarchyLock();
    });
  }, delay);
};

window.addEventListener("resize", () => scheduleTypographyLock(80));
window.addEventListener("hashchange", () => scheduleTypographyLock(40));
window.addEventListener("load", () => {
  scheduleTypographyLock(120);
}, { once: true });
