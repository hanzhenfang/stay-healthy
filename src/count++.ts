import { ref } from "vue";

const count = ref(0); //全局的进度条 mockData

setInterval(() => {
  count.value++; // 不停 +1
  console.log("count.value", count.value);
}, 1000);

export { count };
