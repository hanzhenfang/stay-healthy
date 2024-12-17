import { ref } from "vue";
export function hook() {
  const title = ref("这是我的名字");

  return {
    title
  };
}
