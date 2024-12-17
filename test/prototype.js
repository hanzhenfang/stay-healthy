const arr = [
  {
    roRoleTalkArr: [""],
    roRoleWhatsappArr: [""],
    roBrandArr: ["DFLIFT"],
    roBelongsStr: "dp1AAFI~KNfgp1730084495Um5",
    roRouterArr: [
      "rt1743412569Uct",
      "rt1743412629Uct",
      "rt1743412710Uct",
      "rt1743412760Uct",
      "rt174341277Uct",
      "rt1743411234Uct",
      "rt1743412980Uct",
      "rt1743413020Uct",
      "rt1743413040Uct",
      "rt1743413148Uct",
      "rt1743413055Uct",
      "rt1743413060Uct",
      "rt1743413070Uct",
      "rt1743413080Uct",
      "rt1743413077Uct",
      "rt1743412235Uct",
      "rt1743413090Uct",
      "rt1743413100Uct",
      "rt1743413111Uct",
      "rt1743413150Uct",
      "rt1743413152Uct",
      "rt1743413287Uct",
      "rt1743413296Uct",
      "rt1743413370Uct",
      "rt1743413400Uct",
      "rt1743413415Uct",
      "rt1743413425Uct",
      "rt1743411520Bug",
      "rt1743321121Bug",
      "rt1743414426Bug",
      "rt1742913251Bug"
    ],
    hkey: "dgcrane",
    roPeIdStr: "pe1750211882TSZ",
    roRoleTypeStr: "Prehandle",
    roRoleEmailArr: [""],
    roRoleOrderNum: 1,
    rkey: "roPrehandle17502119059NI",
    roRoleFBMessageArr: [""],
    roRoleUpdateDat: "2025-07-04T09:48:57.064Z",
    roRoleNameStr: "研发-预筛",
    roAvatarConfigObj: [
      {
        atAvatarImgUrlStr:
          "https://lrm-s3-store.s3.cn-north-1.amazonaws.com.cn/degong/avatar/1751610504.webp",
        atTypeStr: "manual"
      }
    ],
    roRoleConversionLocationArr: [""],
    roRoleTelArr: [""],
    roRoleDateDat: "2025-06-18T01:58:25.019Z"
  },
  {
    roRoleTalkArr: [""],
    roRoleWhatsappArr: [""],
    roBrandArr: ["DFLIFT"],
    roBelongsStr: "dp1AAFI~KNfgp1730084495Um5",
    hkey: "dgcrane",
    roPeIdStr: "pe1750211882TSZ",
    roRoleTypeStr: "Manage",
    roRoleEmailArr: [""],
    roRoleOrderNum: 2,
    rkey: "roManage1751271092hZr",
    roRoleFBMessageArr: [""],
    roRoleUpdateDat: "2025-06-30T08:11:32.558Z",
    roRoleNameStr: "研发-管理",
    roRoleConversionLocationArr: [""],
    roRoleTelArr: [""],
    roRoleDateDat: "2025-06-30T08:11:32.558Z"
  },
  {
    roRoleTalkArr: [""],
    roRoleWhatsappArr: [""],
    roBrandArr: [""],
    roBelongsStr: "company",
    roRouterArr: [
      "rt1743413177Uct",
      "rt1743412456Uct",
      "rt1743413160Uct",
      "rt1743413180Uct",
      "rt1743413200Uct",
      "rt1743413210Uct",
      "rt1743413221Uct",
      "rt1743413255Uct",
      "rt1743413261Uct",
      "rt1743413268Uct",
      "rt1743413275Uct",
      "rt1743413155Uct"
    ],
    hkey: "dgcrane",
    roPeIdStr: "pe1750211882TSZ",
    roRoleTypeStr: "Assist",
    roRoleEmailArr: [""],
    roRoleOrderNum: 3,
    rkey: "roAssist1751271260pnh",
    roRoleFBMessageArr: [""],
    roRoleUpdateDat: "2025-06-30T08:15:02.746Z",
    roRoleNameStr: "协助",
    roRoleConversionLocationArr: [""],
    roRoleTelArr: [""],
    roRoleDateDat: "2025-06-30T08:14:20.922Z"
  }
];

function transformRoutes(allRoutes = [], targetIds = []) {
  // 参数安全检查
  if (!Array.isArray(allRoutes) || !Array.isArray(targetIds)) {
    console.error("Invalid parameters: allRoutes and targetIds must be arrays");
    return [];
  }

  // 创建ID到路由的映射
  const routeMap = new Map();
  allRoutes.forEach((route) => {
    if (route && route.rtIdStr) {
      routeMap.set(route.rtIdStr, route);
    }
  });

  // 过滤出有效目标路由并按sortNum排序
  const targetRoutes = targetIds
    .filter((id) => id && typeof id === "string") // 过滤无效ID
    .map((id) => routeMap.get(id))
    .filter((route) => route !== undefined && route !== null);

  // 构建单个路由树
  const buildRouteTree = (route) => {
    if (!route) return null;

    try {
      const isLayout = route.rtMenuTypeStr === "1";
      const path = (route.rtPathStr || "").toLowerCase().replace(/_/g, "-");
      const name = (route.rtMenuNameStr || "").toLowerCase().replace(/_/g, "-");

      if (!path || !name) {
        console.warn("Invalid route: missing path or name", route);
        return null;
      }

      const transformed = {
        path,
        name,
        component: isLayout ? "layout.base" : `view.${name}`,
        meta: {
          title: route.rtTitleStr || "Untitled",
          order: route.rtSortNum || 0
        }
      };

      // 查找所有子路由
      const children = targetRoutes
        .filter((child) => child && child.rtParentIdStr === route.rtIdStr)
        .sort((a, b) => (a.rtSortNum || 0) - (b.rtSortNum || 0))
        .map(buildRouteTree)
        .filter((child) => child !== null); // 过滤掉无效的子路由

      if (children.length > 0) {
        transformed.children = children;
      }

      return transformed;
    } catch (error) {
      console.error("Error building route tree:", error, route);
      return null;
    }
  };

  // 找出所有顶级路由（父ID为'0'或父路由不在targetIds中）
  const rootRoutes = targetRoutes
    .filter(
      (route) =>
        route &&
        (route.rtParentIdStr === "0" ||
          !targetIds.includes(route.rtParentIdStr))
    )
    .sort((a, b) => (a.rtSortNum || 0) - (b.rtSortNum || 0));

  // 为每个顶级路由构建树并过滤无效项
  return rootRoutes.map(buildRouteTree).filter((route) => route !== null);
}

// 处理arr数组，增加安全检查和默认值
if (!Array.isArray(arr)) {
  console.error("Invalid input: arr must be an array");
  arr = [];
}

arr.forEach((item) => {
  try {
    if (!item) return; // 跳过空项

    // 确保roRouterArr是数组，没有则设为空数组
    if (!Array.isArray(item.roRouterArr)) {
      item.roRouterArr = [];
    }

    // 转换路由并赋值给testRoute
    item.testRoute = transformRoutes(allRoutes, item.roRouterArr) || [];
  } catch (error) {
    console.error("Error processing item:", error, item);
    item.testRoute = []; // 出错时设为空数组
  }
});

// 现在arr数组中的每个有效元素都有了testRoute字段
console.log(JSON.stringify(arr, null, 2));

// 假设这是你的原始路由数据

// 处理arr数组，为每个元素添加testRoute字段
arr.forEach((item) => {
  if (item.roRouterArr) {
    item.testRoute = transformRoutes(allRoutes, item.roRouterArr);
  } else {
    item.testRoute = []; // 如果没有roRouterArr，设为空数组
  }
});

// 现在arr数组中的每个元素都有了testRoute字段
console.log(JSON.stringify(arr, null, 2));
