<script lang="ts" setup>
const data = [
  {
    _id: "1",
    createTime: "2025-08-11 09:00:00",
    updateTime: "2025-08-11 10:00:00",
    deptName: "技术部",
    parentId: "0",
    userName: "张三",
    children: [
      {
        _id: "1754882369220",
        deptName: "大前端",
        userName: "张三",
        updateTime: "2025/8/11 11:19:29",
        createTime: "2025/8/11 11:19:29",
        children: []
      }
    ]
  },
  {
    _id: "2",
    createTime: "2025-08-11 08:30:00",
    updateTime: "2025-08-11 09:20:00",
    deptName: "人事部",
    parentId: "0",
    userName: "王五",
    children: []
  }
];
function filterByDeptName(list, deptName) {
  const data = list.map((item) => {
    // 深拷贝防止修改原数据
    const newItem = { ...item };
    // 递归过滤子部门
    newItem.children = filterByDeptName(newItem.children || [], deptName);

    // 当前部门匹配 或 子部门中有匹配的
    if (newItem.deptName.includes(deptName) || newItem.children.length > 0) {
      return newItem;
    }
    return null;
  });
  console.log("data", data[1]);
  return data.filter((item) => Boolean(item)); // 去掉 null
}

const result = filterByDeptName(data, "大前端");
</script>

<template></template>
