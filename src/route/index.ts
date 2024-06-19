import { createRouter, createWebHashHistory } from "vue-router";

import Blue from "@/page/Blue.vue";
import InputEl from "@/page/InputEl.vue";
import Red from "@/page/Red.vue";
import Camera from "@/page/Camera/index.vue";
import Context from "@/page/Context.vue";
import Parent from "@/page/component/Parent.vue";
import Shake from "@/page/Shake.vue";

export const router = createRouter({
  history: createWebHashHistory("/"),
  routes: [
    { path: "/", redirect: "/shake" },

    {
      path: "/blue",
      component: Blue,
    },

    {
      path: "/shake",
      component: Shake,
    },

    {
      path: "/red",
      component: Red,
    },
    { path: "/camera", name: "camaera", component: Camera },
    { path: "/inputel", name: "inputel", component: InputEl },
    {
      path: "/context",
      name: "context",
      component: () => import("@/page/Context.vue"),
    },

    {
      path: "/parent",
      name: "parent",
      component: Parent,
    },
  ],
});
