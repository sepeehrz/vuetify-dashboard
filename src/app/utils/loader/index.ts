import {App, Plugin, render, createVNode} from 'vue';
import loaderComponent from '@app/ui/presentation/components/loader.vue';

interface IOPtions {
  width: number;
  color: string;
  size: number;
}

class Loader {
  app: App;
  $root: any;
  timeout: undefined | ReturnType<typeof setTimeout>;
  mountLoaderCheck = false;
  element!: HTMLElement;
  options: IOPtions = {
    width: 3,
    color: 'primary',
    size: 32
  };

  constructor(app: App, options: IOPtions) {
    this.app = app;
    this.options = Object.assign(this.options, options);
  }
  show(element: HTMLElement) {
    window.addEventListener('resize', this.onResize.bind(this));
    this.mounted();
    this.element = element;
    const rect = element.getBoundingClientRect();
    const topOffset = window.scrollY;
    this.$root.el.style.cssText = `left:${rect.left}px;top:${
      rect.top + topOffset
    }px;height:${rect.height}px;width:${rect.width}px`;
    return {
      hide: () => {
        this.hide();
      }
    };
  }
  hide() {
    if (this.mountLoaderCheck) {
      const element = document.getElementById('loading');
      element?.remove();
      window.removeEventListener('resize', this.onResize);
      this.mountLoaderCheck = false;
    }
  }
  onResize() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      const $el = this.$root.el;
      const rect = this.element.getBoundingClientRect();
      const topOffset = window.scrollY;
      $el.style.cssText = `left:${rect.left}px;top:${
        rect.top + topOffset
      }px;height:${rect.height}px;width:${rect.width}px`;
    }, 10);
  }
  mounted() {
    if (this.mountLoaderCheck === false) {
      const app: any = document.querySelector('body');
      const vNode = createVNode(loaderComponent, {data: this.options});
      vNode.appContext = this.app._context;
      render(vNode, app);
      this.mountLoaderCheck = true;
      this.$root = vNode;
      return this.$root;
    }
  }
}

export const LoaderPlugin: Plugin = {
  install(app: App, options: IOPtions) {
    const instance = new Loader(app, options);
    app.config.globalProperties.dialog = instance;
    app.provide('loader', instance);
  }
};
export default LoaderPlugin;
