import { createRouter, createWebHashHistory } from "vue-router";

import Blue from "@/page/Blue.vue";
import Red from "@/page/Red.vue";
import Camera from "@/page/Camera/index.vue";

export const router = createRouter({
  history: createWebHashHistory("/"),
  routes: [
    { path: "/", redirect: "/blue" },

    {
      path: "/blue",
      component: Blue,
    },

    {
      path: "/red",
      component: Red,
    },
    { path: "/camera", name: "camaera", component: Camera },
  ],
});
