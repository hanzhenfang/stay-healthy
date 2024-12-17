import { createApp } from "vue";
import "./style.css";
import "uno.css";
import App from "./App.vue";
import { router } from "@/route/index";
import "@lazycatcloud/lzc-toolkit/dist/style.css";
import Antd from "ant-design-vue";
const app = createApp(App);

app.use(router);
app.use(Antd);
app.mount("#app");
