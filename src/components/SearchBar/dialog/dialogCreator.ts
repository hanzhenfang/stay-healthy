import Dialog from "./Dialog.vue";

import { h, render } from "vue";

interface DialogType {
  title: string;
  content: string;
  confirmBtn: () => void;
}

export interface DialogPropsType extends DialogType {
  closeBtn: () => void;
}
export class DialogCreator {
  containerEl: HTMLDivElement;
  option: DialogPropsType;
  constructor(option: DialogType) {
    this.containerEl = document.createElement("div");
    this.option = { ...option, closeBtn: this.disMiss.bind(this) };
  }

  present() {
    const vnode = h(Dialog, this.option);
    render(vnode, this.containerEl);
    document.body.insertBefore(this.containerEl, document.body.firstChild);
  }

  disMiss() {
    render(null, this.containerEl);
    document.body.removeChild(this.containerEl);
  } //dialog 消失的方法
}
