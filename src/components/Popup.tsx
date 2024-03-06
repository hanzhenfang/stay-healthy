import { defineComponent, ref, h, nextTick, render, onMounted } from "vue";
import type { Component, VNodeProps } from "vue";

//动画过度效果的时间
const baseAnimationDuration = 200;

const PopupWrapper = defineComponent({
  emits: ["close"],
  setup(props, ctx) {
    const contentEl = ref<HTMLDivElement>();
    const wrapperEl = ref<HTMLDivElement>();

    function clickMask() {
      //wrapper-open & wrapper-close 样式写在  ui/src/style.scss 文件下
      wrapperEl.value!.style.animation = `wrapper-close ease ${baseAnimationDuration}ms`;
      ctx.emit("close");
    }

    onMounted(() => {
      if (!contentEl.value || !wrapperEl.value) return;
      wrapperEl.value.style.animation = `wrapper-open ease ${baseAnimationDuration}ms`;
      wrapperEl.value.style.animationFillMode = "forwards";
      contentEl.value.style.animation = `conent-open ease ${baseAnimationDuration}ms`;
    });
    return () => (
      <div onClick={() => clickMask()} class="popup_wrapper" ref={wrapperEl}>
        <div class="w-full h-full flex items-end">
          <div ref={contentEl} class="content w-fit" id="$popupContent">
            {ctx.slots.default?.()}
          </div>
        </div>
      </div>
    );
  },
});

type ExtractComponentProps<TC> = TC extends new (...arg: any) => {
  $props: infer P;
}
  ? P
  : never;

export function popupCreator<C extends Component>(
  component: C,
  props?: ExtractComponentProps<C>
) {
  const container = document.createElement("div");
  container.style.width = "100%";
  container.style.height = "100%";
  container.style.position = "absolute";
  container.style.zIndex = "9999999";
  const isShow = ref(false);
  function open() {
    if (isShow.value) return;
    const vnode = h(
      PopupWrapper,
      { onClose: close },
      {
        default: () => h(component, props as VNodeProps),
      }
    );
    render(vnode, container);
    document.body.appendChild(container);
    isShow.value = true;
  }
  function close() {
    const contentElement: HTMLDivElement = document.getElementById(
      "$popupContent"
    ) as HTMLDivElement;
    if (!contentElement) return;
    contentElement.style.animation = `content-close ease ${baseAnimationDuration}ms`;
    setTimeout(() => {
      container.remove();
      isShow.value = false;
    }, baseAnimationDuration - 20);
  }
  return {
    open,
    close,
    isShow,
  };
}
