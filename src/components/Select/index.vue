<script setup lang="ts">
  import { Select, Switch, AutoComplete } from "ant-design-vue";

  const mockData = [
    {
      label: "Alice Johnson",
      value: "ID12345"
    },
    {
      label: "Bob Smith",
      value: "ID67890"
    },
    {
      label: "Charlie Brown",
      value: "ID11223"
    },
    {
      label: "Diana Prince",
      value: "ID44556"
    },
    {
      label: "Eve Adams",
      value: "ID77889"
    },
    {
      label: "韩振方",
      value: "ID77889"
    }
  ];

  function filterOption(input: string, option: (typeof mockData)[number]) {
    const result = option.label.toLowerCase().includes(input.toLowerCase());
    console.log("result", result);
    return result;
  }
</script>
<template>
  <div class="flex flex-col gap-10px">
    <Switch style="width: 100px" :options="mockData"></Switch>
    <Select
      :options="mockData"
      show-search
      :filter-option="filterOption"></Select>

    <AutoComplete
      style="width: 100px"
      :options="mockData"
      :filter-option="filterOption"></AutoComplete>
  </div>
</template>
