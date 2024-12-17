/// <reference types="vite/client" />
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare interface Window {
  $wujie: any;
  hanzhenfang: string;
}

declare namespace User {
  type name = string;
  interface Info {
    age: number;
    tel: number;
  }
}

interface Box {
  height: string;
}

interface Box {
  width: string;
}
