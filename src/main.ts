import { createApp } from "vue";
import "./style.css";
import "uno.css";
import App from "./App.vue";
import { router } from "@/route/index";

import "@lazycatcloud/lzc-toolkit/dist/style.css";

const app = createApp(App);

console.log("哈哈");
app.use(router);
app.mount("#app");
