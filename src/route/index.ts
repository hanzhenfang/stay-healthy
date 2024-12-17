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
import DoubleDrag from "@/page/DoubleDrag.vue";
import AbortController from "@/page/AbortController.vue";
import Debugger from "@/page/Debugger.vue";
import TimeSlice from "@/page/TimeSlice.vue";
import TestPage from "@/page/TestRoute.vue";
import Emiter from "@/page/Emitter/index.vue";
import PickFile from "@/page/pick-file/index.vue";
import VirtualList from "@/page/VitrualList/index.vue";
import Race from "@/page/Race.vue";
import Reactive from "@/page/Reactive.vue";

export const router = createRouter({
  history: createWebHashHistory("/"),
  routes: [
    { path: "/", redirect: "/debugger" },
    {
      path: "/abort",
      component: AbortController
    },

    {
      path: "/timeslice",
      component: TimeSlice
    },

    {
      path: "/reactive",
      component: Reactive
    },

    {
      path: "/race",
      component: Race
    },

    {
      path: "/debugger",
      component: Debugger
    },
    {
      path: "/blue",
      component: Blue
    },

    {
      path: "/test",
      name: "test",
      component: TestPage
    },

    {
      path: "/doubledrag",
      component: DoubleDrag
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
      path: "/pick-file",
      name: "pick-file",
      component: PickFile,
      children: [
        {
          name: "qqq",
          path: "",
          component: Emiter
        }
      ]
    },

    {
      path: "/emitter",
      name: "parent",
      component: Emiter,
      children: [
        {
          name: "qxx",
          path: "",
          component: Emiter
        }
      ]
    },
    {
      path: "/virtual",
      name: "virtual",
      component: VirtualList
    }
  ]
});

window.$ = router;
