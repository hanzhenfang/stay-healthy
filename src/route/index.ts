import { createRouter, createWebHashHistory } from "vue-router";

import Blue from "@/page/Blue.vue";
import InputEl from "@/page/InputEl.vue";
import Red from "@/page/Red.vue";
import Camera from "@/page/Camera/index.vue";
import Context from "@/page/Context.vue";
import Parent from "@/page/component/Parent.vue";
import Editor from "@/page/Editor.vue";
import Editor2 from "@/page/Editor2.vue";
import Editor3 from "@/page/Editor3.vue";
import Form from "@/page/Form.vue";

export const router = createRouter({
  history: createWebHashHistory("/"),
  routes: [
    { path: "/", redirect: "/parent" },

    {
      path: "/blue",
      component: Blue
    },

    {
      path: "/editor",
      component: Editor
    },

    {
      path: "/editor2",
      component: Editor2
    },

    {
      path: "/editor3",
      component: Editor3
    },
    {
      path: "/form",
      component: Form
    },

    {
      path: "/red",
      component: Red
    },
    { path: "/camera", name: "camaera", component: Camera },
    { path: "/inputel", name: "inputel", component: InputEl },
    {
      path: "/context",
      name: "context",
      component: () => import("@/page/Context.vue")
    },

    {
      path: "/parent",
      name: "parent",
      component: Parent
    }
  ]
});
