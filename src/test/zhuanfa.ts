export {};
const treeData = [
  {
    name: "account",
    path: "/account",
    component: "layout.base",
    meta: {
      title: "账号管理"
    },
    children: [
      {
        name: "account_list",
        path: "/account/list",
        component: "view.account_list",
        meta: {
          title: "账号列表"
        }
      },
      {
        name: "account_register",
        path: "/account/register",
        component: "view.account_register",
        meta: {
          title: "注册新账号"
        }
      }
    ]
  },
  {
    name: "home",
    path: "/home",
    component: "layout.base$view.home",
    redirect: "/account",
    meta: {
      title: "home",
      hideInMenu: true
    }
  }
];

const labelValueMap = [
  {
    label: "注册新账号",
    value: "/account/register"
  },
  {
    label: "账号列表",
    value: "/account/list"
  }
];

const filterTree = (tree, labelValueMap) => {
  // 用来快速查找需要的节点
  const labelMap = new Map(
    labelValueMap.map((item) => [item.label, item.value])
  );

  const filterNode = (node) => {
    // 如果当前节点符合条件，直接返回
    if (
      labelMap.has(node.meta.title) &&
      labelMap.get(node.meta.title) === node.path
    ) {
      return {
        ...node,
        children: undefined // 清理 children，防止冗余
      };
    }

    // 如果有子节点，递归处理子节点
    if (node.children && node.children.length > 0) {
      const filteredChildren = node.children
        .map(filterNode) // 递归过滤
        .filter((child) => child !== null); // 移除未匹配的子节点

      if (filteredChildren.length > 0) {
        return {
          ...node,
          children: filteredChildren
        };
      }
    }

    // 如果当前节点及子节点都不匹配，返回 null
    return null;
  };

  // 处理树的顶层节点
  return tree
    .map(filterNode) // 递归过滤
    .filter((node) => node !== null); // 移除未匹配的节点
};

const filteredTree = filterTree(treeData, labelValueMap);

console.log(JSON.stringify(filteredTree, null, 2));
