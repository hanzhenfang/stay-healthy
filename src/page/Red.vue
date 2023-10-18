<script lang="ts" setup>
interface UserInfo<T> {
  item: T;
  page: number;
}

function getData<XX>() {
  let data;
  return data as UserInfo<XX>;
}

interface User {
  name: string;
  age: number;
}

interface VipUser {
  name: string;
  age: number;
  password: string;
}

const list = getData<User>();
</script>
<template>
  <div class="w-full h-full bg-pink"></div>
</template>
