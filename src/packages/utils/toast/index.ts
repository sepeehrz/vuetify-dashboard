import {App, Plugin, h, render} from 'vue';
import ToastComponent from '@dashboard/ui/presentation/components/toast.vue';

interface IToast {
  timeout?: number;
  id?: string;
  counter?: number;
  withClose?: boolean;
  withCounter?: boolean;
  type?: 'warning' | 'info' | 'success' | 'error';
}
export class Toast {
  options: IToast = {
    timeout: 4000,
    withClose: false,
    withCounter: true
  };
  mountToastCheck = false;
  $root: any = {};
  timeout: any;
  app: App;

  constructor(app: App, options: IToast) {
    this.app = app;
    this.options = Object.assign(this.options, options);
  }
  showToast(toast: IToast = {}, position?: string) {
    this.mountToast();
    toast.id = 'toast.' + Date.now();
    toast.counter = 1;

    const toastItems = Object.assign({}, this.options, toast);

    const commitData = {
      position: position,
      show: true,
      toastData: toastItems
    };
    this.$root.ctx.commit(commitData);
    clearTimeout(this.timeout);
    this.timeout = setTimeout(
      () => {
        this.unMountToast();
      },
      toast.timeout ? toast.timeout : this.options.timeout
    );
  }
  mountToast() {
    if (this.mountToastCheck === false) {
      const vNode = h(ToastComponent);
      const container = document.createElement('div');
      container.setAttribute('id', 'v-toast');
      document.querySelector('#app')?.appendChild(container);
      render(vNode, container);
      this.mountToastCheck = true;
      this.$root = vNode.component;
      return this.$root;
    }
  }
  unMountToast() {
    if (this.mountToastCheck) {
      const element = document.getElementById('v-toast');
      element?.remove();
      this.mountToastCheck = false;
    }
  }
}

export const ToastPlugin: Plugin = {
  install(app: App, options: IToast) {
    const instance = new Toast(app, options);
    app.config.globalProperties.toast = instance;
    app.provide('toast', instance);
  }
};

export default ToastPlugin;
