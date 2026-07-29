const AIR_TOPICS = {
  doas: {
    title:"DOAS 独立新风系统", kicker:"DEDICATED OUTDOOR AIR SYSTEM", hero:"doas-air-soul-interior-20260718.jpg", secondary:"doas-system-route-premium-20260718.jpg", closing:"doas-closing/doas-long-term-order-web.jpg",
    claim:"新风应该被独立处理，而不是成为空调的附属负担。",
    lead:"DOAS 独立承担室外空气的过滤、除湿或预处理，再把稳定的新风送到真实停留区；空调则专注处理室内显热负荷。",
    tags:["独立新风","潜热优先","正压边界","风量平衡"],
    outcomes:[["新风够用","按人数、空间与使用场景组织风量。"],["湿气受控","高湿室外空气先处理，再进入住宅。"],["空气可达","卧室、客厅与封闭房间都有明确送回风路径。"],["压力稳定","新风、排风与厨房补风共同维持合理压差。"],["运行安静","低速风管、消声与设备隔振共同控制噪声。"]],
    flow:["室外空气","过滤净化","冷却除湿","再热或送风状态","分区送风","排风与压力平衡"],
    compare:["空调兼顾新风，湿负荷随压缩机启停波动|只看总风量，不看空气实际到达|室外高湿空气未经处理进入吊顶","新风与室内循环空气职责分开|按露点和新风负荷独立控制|风量、压差、过滤和噪声均可调试"],
    params:["设计新风量","送风露点","过滤压差","房间风量平衡","室内外压差","夜间噪声"],
    models:["大平层：卧室夜间空气更新","多层住宅：竖向风路与分区平衡","大宅：高峰场景、冗余与集中监测"]
  },
  decoupling: {
    title:"温湿度去耦系统", kicker:"SENSIBLE & LATENT LOADS DECOUPLED", hero:"doas-traditional-boundary-premium-20260718.jpg", secondary:"doas-changsha-climate/changsha-climate-decoupling-web.jpg", closing:"doas-outcome-logic/five-constant-outcome-logic-web.jpg",
    claim:"温度与湿度是两种负荷，不应该被一次启停同时决定。",
    lead:"末端负责显热，新风与除湿设备负责潜热；把冷、热和水汽分别处理，才能在梅雨季、部分负荷和夜间保持稳定。",
    tags:["显潜热分离","低负荷稳定","避免过冷","露点保护"],
    outcomes:[["温度稳定","房间不过冷也不反复启停。"],["湿度稳定","降温需求很小时仍能持续处理水汽。"],["体感自然","减少用低温大风换取干爽。"],["末端安全","辐射或冷表面始终受到露点保护。"],["能耗清晰","不同负荷由适合的设备承担。"]],
    flow:["室外湿负荷","室内潜热","独立除湿","室内显热","末端换热","联合控制"],
    compare:["一台设备同时追温度和湿度|温度先到设定值后除湿停止|为除湿持续过冷再电加热","显热与潜热分别计算|低负荷季仍有独立除湿能力|露点、温度和设备容量统一控制"],
    params:["室内显热负荷","新风潜热负荷","室内设计露点","末端供水/蒸发温度","部分负荷能力","系统能耗"],
    models:["梅雨季大平层：低冷负荷高湿负荷","辐射住宅：露点保护优先","多功能大宅：按房间用途分区去耦"]
  },
  dewpoint: {
    title:"住宅露点控制", kicker:"DEW POINT IS THE SAFETY LINE", hero:"doas-science-dewpoint-safety-20260718.jpg", secondary:"doas-dewpoint-logic/dewpoint-safety-logic-web.jpg", closing:"generated-air-scenes-v2/air-v2-tea-balcony-snow-solid-wood-table.webp",
    claim:"相对湿度描述感受，露点才揭示空气里真正的水汽负担。",
    lead:"露点与最冷表面温度共同决定结露。控制系统需要同时理解室外空气、室内湿源、冷表面和设备运行状态。",
    tags:["露点监测","表面测温","防结露","联锁保护"],
    outcomes:[["墙面不返潮","最冷表面与露点保持安全差值。"],["风口不滴水","送风状态和保温构造同时受控。"],["辐射不结露","冷水温度随室内露点动态保护。"],["木作更安全","柜后、墙角和冷桥不长期处于高风险。"],["异常可预警","露点上升时先调整系统而不是等到凝水。"]],
    flow:["温湿度采集","露点计算","最冷表面识别","设备能力判断","联锁调节","趋势记录"],
    compare:["只显示相对湿度|发现水珠后才停机|所有房间共用一个传感器","温湿度实时换算露点|露点接近冷表面即干预|高风险房间和节点独立监测"],
    params:["室内露点","室外露点","最冷表面温度","露点安全差","传感器偏差","报警与联锁"],
    models:["普通空调住宅：风口与冷桥保护","辐射住宅：水温动态上限","地下及收藏空间：多点监测与趋势预警"]
  },
  radiant: {
    title:"辐射空调系统", kicker:"COMFORT WITHOUT STRONG DRAFTS", hero:"doas-value-four-season-windless-20260718.jpg", secondary:"doas-comfort-science/thermal-comfort-six-variables-web.jpg", closing:"generated-air-scenes-v2/air-v2-meditation-yoga.webp",
    claim:"舒适不一定来自强风，也可以来自稳定而温和的表面换热。",
    lead:"辐射末端通过顶、墙或地面与人体和空间交换热量；新风、除湿与露点保护必须独立成立。",
    tags:["低风感","表面换热","温湿去耦","露点保护"],
    outcomes:[["体感均匀","减少头冷脚热和局部直吹。"],["运行安静","末端弱化风机与高速气流。"],["空间完整","减少显眼风口对室内设计的干扰。"],["湿度独立","辐射末端不承担除湿任务。"],["表面安全","冷辐射始终高于受控露点边界。"]],
    flow:["建筑负荷","辐射面积","水温与流量","独立新风除湿","露点联锁","分区控制"],
    compare:["只铺辐射末端，不配置除湿|按空气温度粗放启停|忽略吊顶和饰面热阻","先校核冷热负荷与有效面积|新风除湿独立承担潜热|表面温度、露点与水温实时联锁"],
    params:["有效辐射面积","单位面积负荷","供回水温度","表面温度","室内露点","水力平衡"],
    models:["大平层：客餐厅与卧室分区","多层住宅：水力竖向平衡","大宅：辐射、新风和快速响应末端组合"]
  },
  heatpump: {
    title:"空气源两联供系统", kicker:"ONE HEAT PUMP · TWO SEASONS", hero:"residential-climate-assessment-premium-20260718.jpg", secondary:"doas-project-delivery-commissioning-20260718.jpg", closing:"five-constant-hero-four-season-20260718.jpg",
    claim:"两联供不是一台主机带两个末端，而是全年水系统的完整协调。",
    lead:"空气源热泵承担夏季制冷和冬季供暖，风机盘管、地暖或辐射末端、缓冲水量、水力分配与除湿共同决定体验。",
    tags:["冷热源","水力系统","地暖","夏季除湿"],
    outcomes:[["冬季温和","低温水地暖持续稳定运行。"],["夏季可靠","风机盘管或辐射末端按实际负荷配置。"],["化霜可控","主机化霜时室内温度波动受到缓冲。"],["水力平衡","远近端和不同楼层得到正确流量。"],["控制一致","热源、泵、阀和房间需求不互相打架。"]],
    flow:["建筑负荷","热泵选型","缓冲与水力分离","末端分区","除湿与新风","季节控制"],
    compare:["按建筑面积套主机匹数|水泵和主机各自启停|夏季只降温不处理湿度","按设计工况校核冷热能力|主机、水泵、阀门与缓冲容积联动|新风除湿补足夏季潜热"],
    params:["冬季设计负荷","夏季显潜热","低温制热能力","系统水容量","水泵扬程流量","化霜与备用策略"],
    models:["城市大平层：地暖＋风机盘管","三层住宅：分层水力与独立温控","大宅：多模块、冗余和峰谷策略"]
  },
  vrf: {
    title:"氟系统中央空调", kicker:"DIRECT EXPANSION · PRECISE ZONING", hero:"air-page-hero-premium-20260720.jpg", secondary:"generated-air-scenes-v2/air-v2-reading-study.webp", closing:"generated-air-scenes-v2/air-v2-esports-room.webp",
    claim:"氟系统的价值不只在快速制冷，更在正确容量、冷媒边界和气流组织。",
    lead:"室外机、室内机、冷媒配管、冷凝水、新风与控制必须作为整体深化，避免匹数够了但房间仍不好用。",
    tags:["快速响应","独立分区","冷媒配管","气流组织"],
    outcomes:[["冷热快速","高频使用空间能够迅速响应。"],["房间独立","不同朝向与使用时间分别控制。"],["气流舒适","风口避开床、沙发和长期停留位置。"],["冷凝可靠","排水、保温与检修不留下滴漏风险。"],["容量合理","不过度放大导致频繁启停和除湿变差。"]],
    flow:["逐室负荷","室内机选择","室外机组合","冷媒管路","风口与冷凝水","新风协同"],
    compare:["按面积和匹数快速套型|室内机只看吊顶能否放下|新风与空调互不沟通","逐房间计算显热和潜热|同时校核气流、噪声和检修|新风量与室内机能力共同验证"],
    params:["逐室冷负荷","室内外机配比","冷媒管长高差","送回风阻力","冷凝水坡度","房间噪声"],
    models:["大平层：卧室与公区独立控制","多层住宅：冷媒高差与室外机位置","大宅：分系统降低单点故障影响"]
  },
  boilerfloor: {
    title:"燃气壁挂炉地暖", kicker:"LOW-TEMPERATURE HEATING · WARM SURFACES", hero:"generated-air-scenes-v2/air-v2-elder-bedroom.webp", secondary:"generated-air-scenes-v2/air-v2-master-bedroom-night.webp", closing:"five-constant-hero-premium-20260718.jpg",
    claim:"地暖的舒适来自低温、连续和均匀，而不是把地面烧得很热。",
    lead:"壁挂炉、混水、水泵、分集水器、盘管和控制共同建立稳定供暖；生活热水与采暖负荷也要明确优先级。",
    tags:["低温供暖","地面辐射","水力平衡","热水优先"],
    outcomes:[["脚下温和","地表温度均匀且不过热。"],["房间稳定","避免大开大关造成长时间波动。"],["远端有流量","每一回路经过计算和平衡。"],["设备高效","回水温度和运行方式适合冷凝工况。"],["热水不冲突","生活热水优先时供暖影响受到管理。"]],
    flow:["热负荷","热源容量","系统水温","盘管与回路","水力平衡","房间控制"],
    compare:["按面积估算壁挂炉功率|回路长度随施工现场安排|频繁启停追求快速升温","分别计算采暖与生活热水需求|盘管间距、长度和流量预先设计|采用低温连续运行与分区补偿"],
    params:["房间热负荷","供回水温度","地表温度","回路长度","设计流量","燃气与排烟条件"],
    models:["大平层：分区地暖与生活热水","三层住宅：楼层水力平衡","大宅：采暖热源与星级热水统筹"]
  },
  ventilation: {
    title:"全屋新风系统", kicker:"FRESH AIR MUST REACH PEOPLE", hero:"generated-air-scenes-v2/air-v2-opening-clean-living.webp", secondary:"generated-air-scenes-v2/air-v2-kids-bedroom-night-closed-curtains.webp", closing:"generated-air-scenes-v2/air-v2-cinema-large-dragon-screen.webp",
    claim:"新风不是装了一台机器，而是每个房间都真正得到空气更新。",
    lead:"室外取风、过滤、热回收、风管、送回风和排风路径共同决定卧室夜间与全屋日常空气质量。",
    tags:["空气更新","CO₂控制","过滤","房间平衡"],
    outcomes:[["卧室不闷","关窗睡眠仍有持续空气更新。"],["污染被稀释","CO₂、气味和室内释放物不过度累积。"],["室外空气过滤","按当地颗粒物条件配置过滤等级。"],["房间不串味","送排风方向与压力边界正确。"],["维护可执行","滤网、风管和设备可接近可更换。"]],
    flow:["室外取风","过滤与热回收","主风管","房间送风","过流路径","卫生间排风"],
    compare:["只看设备标称风量|门关闭后空气路径中断|滤网难以更换","按人数和房间逐一分配|明确门下、过流口或独立回风|预留检修和压差监测"],
    params:["房间设计风量","CO₂趋势","过滤效率与压差","热回收性能","风管漏风","夜间噪声"],
    models:["大平层：卧室夜间优先","多层住宅：分层干管和平衡","大宅：场景风量与备用运行"]
  },
  kitchenmakeup: {
    title:"住宅厨房补风系统", kicker:"EXHAUST NEEDS A CONTROLLED WAY BACK", hero:"generated-air-scenes-v2/air-v2-kitchen-comfort.webp", secondary:"generated-air-scenes-v2/air-v2-dining-hotpot-family.webp", closing:"kitchen.webp",
    claim:"油烟机排走多少空气，住宅就必须有一条受控的空气补入路径。",
    lead:"大风量排油烟如果没有补风，会造成门难开、冷风倒灌、卫生间返味和壁炉风险。补风要服务排烟，同时不扰动灶具与全屋舒适。",
    tags:["排补平衡","负压可控","油烟捕集","全屋不扰"],
    outcomes:[["油烟抓得住","补风不把烟羽吹散。"],["厨房门好开","运行负压维持在可接受范围。"],["全屋不倒灌","地漏、排风口和门窗不成为无序补风口。"],["冬夏不难受","补风温度与送入位置经过处理。"],["启停自动","与油烟机档位或压差联动。"]],
    flow:["油烟机实测风量","厨房密闭条件","补风量确定","补风处理","送风位置","联动与压差"],
    compare:["开油烟机后靠门窗缝补风|补风直吹灶火和人体|只按油烟机铭牌风量设计","实测系统阻力下的排风量|补风经过过滤和必要温度处理|压差、捕集效果和房门启闭一起验收"],
    params:["排风实测量","补风比例","厨房压差","补风温度","风口速度","联动响应"],
    models:["封闭厨房：局部补风与门缝管理","开放厨房：捕集与全屋压差优先","大宅双厨房：中西厨分别计算与联动"]
  },
  dehumidfresh: {
    title:"除湿新风系统", kicker:"FRESH AIR WITHOUT HUMIDITY BURDEN", hero:"doas-climate-hunan-premium-20260718.jpg", secondary:"climate-humidity-pressure-negative.webp", closing:"five-constant-doas-generated.png",
    claim:"湖南住宅需要的，不只是新鲜空气，而是不把室外湿气一起带进来。",
    lead:"除湿新风机在引入室外空气时同步处理潜热负荷，并与空调、排风和冷凝水系统协同。",
    tags:["新风除湿","梅雨季","送风露点","冷凝排水"],
    outcomes:[["梅雨季干爽","低冷负荷时仍有独立除湿能力。"],["新风持续","不因室外湿度高而被迫关闭。"],["空调减负","潜热由更适合的设备承担。"],["表面安全","送风状态不制造新的冷凝风险。"],["排水可靠","冷凝水有坡度、水封和防倒灌。"]],
    flow:["室外状态","新风负荷","过滤","直膨除湿","送风状态","冷凝水定点排放"],
    compare:["普通新风直接引入高湿空气|除湿靠空调长时间过冷|冷凝水用临时软管排放","按室外设计露点校核除湿能力|新风潜热与室内负荷分别承担|冷凝排水按正式系统施工验收"],
    params:["室外设计露点","新风除湿量","送风温湿度","部分负荷能力","冷凝水流量","房间风量"],
    models:["大平层：卧室夜间新风除湿","多层住宅：分层风量与冷凝排水","地下复合住宅：高湿区域独立控制"]
  },
  pointexhaust: {
    title:"定点排风系统", kicker:"REMOVE POLLUTANTS AT THE SOURCE", hero:"generated-air-scenes-v2/air-v2-bathroom-comfort.webp", secondary:"bathroom-negative-pressure.webp", closing:"generated-air-scenes-v2/air-v2-music-collection.webp",
    claim:"气味、湿气和污染物，应该在扩散以前从源头离开。",
    lead:"卫生间、衣帽间、家政、设备间与特殊空间需要不同排风时序和压差。定点排风必须有对应补风路径。",
    tags:["源头捕集","异味控制","排湿","负压边界"],
    outcomes:[["异味不过房","污染空间保持受控负压。"],["湿气快离开","淋浴后按湿度或延时持续排风。"],["衣物更干爽","衣帽间和家政区减少气味与水汽积累。"],["设备不串味","排风出口、止回和竖井组织正确。"],["全屋仍平衡","排走空气的同时提供可控补风。"]],
    flow:["污染源识别","排风量","捕集位置","支管与止回","室外排放","补风与联动"],
    compare:["所有空间共用一种风量|排风口离污染源很远|开排风后全屋无序负压","按气味、湿度和使用时序分类|排风口靠近污染发生位置|补风、止回与运行延时一起设计"],
    params:["设计排风量","局部捕集速度","房间压差","延时/湿控逻辑","支管阻力","出口位置"],
    models:["双卫大平层：独立湿控排风","多层住宅：竖井与止回平衡","大宅：卫生间、衣帽与家政分类排风"]
  },
  constanthumidity: {
    title:"恒温恒湿系统", kicker:"STABILITY ACROSS HOURS AND SEASONS", hero:"five-constant-hero-breathing-20260718.jpg", secondary:"doas-science-thermal-comfort-20260718.jpg", closing:"five-constant-closing-generated.png",
    claim:"恒定不是把数字锁死，而是在变化中保持身体可以感知的稳定。",
    lead:"温度、湿度、新风、围护和内部负荷随时变化。恒温恒湿系统通过冷热源、除湿、加湿与末端控制协同减少波动。",
    tags:["全年稳定","显潜热协同","精细控制","趋势记录"],
    outcomes:[["温度少波动","朝向、日照和人数变化被及时处理。"],["湿度不过界","梅雨除湿与冬季必要加湿分别受控。"],["房间有差异","卧室、收藏和运动空间采用不同目标。"],["设备不打架","制冷、供暖、除湿和加湿互锁。"],["性能可追踪","趋势数据展示稳定度而非单点读数。"]],
    flow:["目标边界","冷热负荷","湿负荷","空气处理","房间末端","传感与联合控制"],
    compare:["每台设备各自看一个温控器|频繁启停造成温湿摆动|用统一设定覆盖所有房间","建立温湿度联合控制序列|设备按优先级和死区协调|按用途设置房间目标和时段"],
    params:["温度稳定度","湿度稳定度","露点范围","传感器精度","响应时间","全年趋势"],
    models:["舒适型大平层：日常稳定优先","收藏复合住宅：特殊房间独立","大宅：多区域控制与中央监测"]
  },
  clean: {
    title:"恒洁恒净空气系统", kicker:"CLEAN AIR IS A CONTINUOUS STATE", hero:"doas-five-outcomes-premium-20260718.jpg", secondary:"authority-sources/well-air-web.png", closing:"five-constant-comfort-generated.png",
    claim:"空气洁净不是一次净化，而是污染源、过滤和空气更新长期保持平衡。",
    lead:"室外颗粒物、室内释放物、烹饪与人员活动同时存在。过滤、新风、排风、材料控制和维护共同决定真实空气质量。",
    tags:["颗粒物过滤","VOC管理","源头控制","持续监测"],
    outcomes:[["颗粒物更低","室外空气经过分级过滤再进入。"],["气味不积累","新风和定点排风持续稀释。"],["滤网可维护","压差与更换周期明确。"],["洁净不靠香味","不以遮盖气味替代污染控制。"],["数据可信","CO₂、PM2.5等用于判断运行，而非装饰屏幕。"]],
    flow:["污染源识别","室外过滤","室内循环净化","新风稀释","定点排风","监测与维护"],
    compare:["只购买高CADR净化器|滤网按时间盲目更换|所有污染都用过滤解决","先减少材料和生活污染源|按压差、负荷和使用状态维护|颗粒物、气体污染与CO₂分别处理"],
    params:["PM2.5趋势","CO₂趋势","过滤效率","滤网压差","新风换气","VOC与异味事件"],
    models:["城市大平层：室外颗粒物优先","新装修住宅：源头与通风优先","大宅：分区过滤、事件排风和趋势管理"]
  },
  insulation: {
    title:"住宅建筑保温系统", kicker:"THE ENVELOPE SETS THE HVAC LOAD", hero:"doas-value-breathing-home-20260718.jpg", secondary:"air-still-curtain-v2.webp", closing:"invisible-comfort-green.webp",
    claim:"设备决定如何处理负荷，建筑围护先决定负荷有多大。",
    lead:"外墙、屋面、门窗、遮阳、气密和热桥共同影响室内冷热需求、表面温度、结露风险与设备容量。",
    tags:["连续保温","门窗气密","热桥控制","负荷降低"],
    outcomes:[["冷热负荷降低","设备不必长期追赶室外变化。"],["表面更舒适","冬季内表面不过冷，夏季辐射热更低。"],["结露风险下降","冷桥和高湿空气渗透得到管理。"],["房间更均匀","边界房间与核心区差异缩小。"],["系统更安静","更小负荷允许设备低速稳定运行。"]],
    flow:["气候边界","围护热工","门窗与遮阳","气密层","热桥节点","HVAC负荷联动"],
    compare:["设备选型后才看建筑条件|只看保温材料厚度|门窗、墙体和机电穿孔各自施工","机电方案前完成负荷与围护评估|连续性、热桥和气密一起校核|用降低后的真实负荷选择设备"],
    params:["围护传热","窗墙比与遮阳","气密性","热桥表面温度","逐时冷热负荷","渗透风量"],
    models:["高层大平层：玻璃幕墙与遮阳","坡屋顶住宅：屋面连续保温","大宅：复杂体形、洞口和机电穿透协同"]
  }
};

const AIR_PALETTES={
  doas:["#168d91","#61d1c7","#426fd0"],
  decoupling:["#467fc7","#56c8c0","#7b68c5"],
  dewpoint:["#316ed4","#65bce1","#6f66c7"],
  radiant:["#6f62c7","#78a7e8","#d29b4a"],
  heatpump:["#4778c6","#59b7aa","#7d69be"],
  vrf:["#356fd2","#65a8ed","#685ebd"],
  boilerfloor:["#c96832","#e0a34b","#8870bf"],
  ventilation:["#168d88","#63cbbd","#4b7bc9"],
  kitchenmakeup:["#d36b3f","#e4aa4d","#339f94"],
  dehumidfresh:["#168c9e","#55c8ca","#5573cb"],
  pointexhaust:["#d35e4d","#e19b50","#367d9f"],
  constanthumidity:["#655fc2","#5da9d5","#d4a148"],
  clean:["#568c58","#71b99d","#4b81c2"],
  insulation:["#887052","#c29862","#428a80"]
};
const key=document.body.dataset.topic;
const d=AIR_TOPICS[key];
if(!d) throw new Error("Unknown air topic");
const palette=AIR_PALETTES[key];
document.documentElement.style.setProperty("--topic",palette[0]);
document.documentElement.style.setProperty("--topic-2",palette[1]);
document.documentElement.style.setProperty("--topic-3",palette[2]);
document.documentElement.style.setProperty("--wp-accent",palette[0]);
document.documentElement.style.setProperty("--wp-accent-2",palette[1]);
document.title=`${d.title} | ZEFENG MEP`;
const outcomeNames=["01 RESULT","02 RESULT","03 RESULT","04 RESULT","05 RESULT"];
const flowNums=["01","02","03","04","05","06"];
const modelNames=["MODEL 01","MODEL 02","MODEL 03"];
const [bad,good]=d.compare.map(s=>s.split("|"));
document.querySelector("#air-topic-main").innerHTML=`
<section class="wp-hero"><img src="../images/${d.hero}" alt="${d.title}住宅场景"><div class="wp-hero-copy"><p class="wp-kicker">${d.kicker}</p><h1>${d.claim}</h1><p class="wp-hero-lead">${d.lead}</p><div class="wp-hero-tags">${d.tags.map(x=>`<span>${x}</span>`).join("")}</div></div></section>
<section class="wp-section" id="outcomes"><header class="wp-section-head"><div><p class="wp-kicker">LIVED OUTCOMES</p><h2>设备退后，生活结果应该走到前面。</h2></div><div>${d.lead}</div></header><div class="wp-outcomes">${d.outcomes.map((x,i)=>`<article class="wp-card"><span>${outcomeNames[i]}</span><strong>${x[0]}</strong><p>${x[1]}</p></article>`).join("")}</div></section>
<section class="wp-section wp-system" id="system" style="--section-image:url('../images/${d.secondary}')"><header class="wp-section-head"><div><p class="wp-kicker">SYSTEM ROUTE</p><h2>先建立完整判断路径，再谈设备组合。</h2></div><div>每一段都必须可计算、可施工、可调试，并在真实运行中持续成立。</div></header><div class="wp-flow">${d.flow.map((x,i)=>`<article><span>${flowNums[i]}</span><strong>${x}</strong><p>作为完整系统路径中的必要判断与交付节点。</p></article>`).join("")}</div></section>
<section class="wp-section" id="boundary"><header class="wp-section-head"><div><p class="wp-kicker">FROM EQUIPMENT TO SYSTEM</p><h2>有设备，不等于系统已经成立。</h2></div><div>品质住宅的差异，来自负荷、边界、控制和交付是否被组织成一套逻辑。</div></header><div class="wp-compare"><article><h3>常见的设备式做法</h3><ul>${bad.map(x=>`<li>${x}</li>`).join("")}</ul></article><article><h3>完整的系统式做法</h3><ul>${good.map(x=>`<li>${x}</li>`).join("")}</ul></article></div><div class="wp-boundary"><strong>选择边界：</strong>本专栏不提供脱离建筑条件的固定套餐。品牌和型号必须服从逐室负荷、气候、人员、空间、噪声、检修与长期运行要求。</div></section>
<section class="wp-section" id="parameters"><header class="wp-section-head"><div><p class="wp-kicker">DESIGN · TEST · RECORD</p><h2>关键参数必须能够被现场验证。</h2></div><div>以下为项目沟通与验收维度，具体目标值依据现行规范、建筑条件和家庭需求确定。</div></header><div class="wp-parameters">${d.params.map((x,i)=>`<article class="wp-param"><em>0${i+1}</em><strong>${x}</strong><p>设计阶段明确目标与测点，调试阶段记录实测结果和运行边界。</p></article>`).join("")}</div></section>
<section class="wp-section" id="models"><header class="wp-section-head"><div><p class="wp-kicker">THREE DESIGN MODELS</p><h2>住宅不同，系统判断的起点也不同。</h2></div><div>以下为设计沟通模型，不代表真实案例或固定品牌套餐。</div></header><div class="wp-models">${d.models.map((x,i)=>{const [name,note]=x.split("：");return `<article class="wp-model"><b>${modelNames[i]}</b><h3>${name}</h3><dl><div><dt>核心任务</dt><dd>${note}</dd></div><div><dt>设计方式</dt><dd>依据逐室负荷、使用时间和建筑边界完成系统深化。</dd></div><div><dt>交付结果</dt><dd>参数、控制、测试和维护资料完整留档。</dd></div></dl></article>`}).join("")}</div></section>
<section class="wp-section" id="delivery"><header class="wp-section-head"><div><p class="wp-kicker">DESIGN TO OPERATION</p><h2>空气系统的价值，要在入住以后持续成立。</h2></div><div>从负荷判断到季节复核，完整交付不能停在设备通电。</div></header><div class="wp-delivery">${["需求与边界","负荷计算","空间深化","洁净施工","联合调试","季节复核"].map((x,i)=>`<article><span>0${i+1}</span><strong>${x}</strong><p>形成对应记录并交付长期运行。</p></article>`).join("")}</div></section>
<section class="wp-consult" style="--closing-image:url('../images/${d.closing}')"><p class="wp-kicker">AIR SHOULD SERVE LIFE</p><h2>${d.claim}</h2><p>${d.lead}</p><a class="wp-button" href="../index.html#project-access-contact">提交住宅空气信息</a></section>`;
