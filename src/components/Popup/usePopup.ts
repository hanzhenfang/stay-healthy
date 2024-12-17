import { Component, h, render } from "vue";
//h: 创建虚拟 dom  render: 挂载虚拟dom 到真实 dom节点

import PopupWrapper from "./PopupWrapper.vue";
// 引入刚刚写好的 PopupWrapper 组件

interface WrapperOption {
  //根据需要写一个 interface
  direction: "top" | "bottom";
}

export function popupCreator(ContentPage: Component, option?: WrapperOption) {
  const container = document.createElement("div");
  function open() {
    const vnode = h(
      PopupWrapper,
      {
        direction: option?.direction,
        onClose: close //作为第二个参数传入 close 函数
      },
      {
        default: () => h(ContentPage) //第三个参数将作为 slot 传入 PopupWrapper
      }
    );
    render(vnode, container);
    document.body.appendChild(container);
  }

  function close() {
    container.remove();
  }

  return {
    open,
    close
  };
}

// const baseAnimationDuration = 300;
// export function popupCreator(component: Component, props?: any) {
//   const container = document.createElement("div");
//   container.style.width = "100%";
//   container.style.height = "100%";
//   container.style.position = "absolute";
//   container.style.zIndex = "9999999";
//   const isShow = ref(false);
//   function open() {
//     if (isShow.value) return;
//     const vnode = h(
//       PopupWrapper,
//       { onClose: close },
//       {
//         default: () => h(component, props as VNodeProps),
//       }
//     );
//     render(vnode, container);
//     document.body.appendChild(container);
//     isShow.value = true;
//   }
//   function close() {
//     const contentElement: HTMLDivElement = document.getElementById(
//       "$popupContent"
//     ) as HTMLDivElement;
//     if (!contentElement) return;
//     contentElement.style.animation = `content-close ease ${baseAnimationDuration}ms`;
//     setTimeout(() => {
//       container.remove();
//       isShow.value = false;
//     }, baseAnimationDuration - 20);
//   }
//   return {
//     open,
//     close,
//     isShow,
//   };
// }
