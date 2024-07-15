import { createRouter, createWebHashHistory } from "vue-router";

import Blue from "@/page/Blue.vue";
import InputEl from "@/page/InputEl.vue";
import Red from "@/page/Red.vue";
import Camera from "@/page/Camera/index.vue";
import Context from "@/page/Context.vue";
import Parent from "@/page/component/Parent.vue";
import Drag from "@/page/Drag.vue";
import DragTest from "@/page/Drag-test.vue";

export const router = createRouter({
  history: createWebHashHistory("/"),
  routes: [
    { path: "/", redirect: "/clipboard" },

    {
      path: "/blue",
      component: Blue,
    },

    {
      path: "/dragtest",
      component: DragTest,
    },
    {
      path: "/shake",
      component: Drag,
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
    {
      path: "/clipboard",
      component: () => import("@/view/clipboard/index.vue"),
    },

    {
      path: "/drag",
      component: () => import("@/page/DragPlus.vue"),
    },

    {
      path: "/snippet",
      component: () => import("@/page/CodeSnippet.vue"),
    },
  ],
});
