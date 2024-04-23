import type {DefineComponent} from 'vue';
import type {RouteLocationRaw} from 'vue-router';

export type Menu = {
  label: string;
  to?: RouteLocationRaw;
  command?: () => void;
  items?: Menu[];
  meta?: Record<string, string | number>;
  priority?: number;
  module?: string;
};

export type Slot = {
  name: string;
  component: DefineComponent<{}, {}, any>;
};

export class Layout {
  private menus: Menu[] = [];
  private slots: Slot[] = [];

  addMenu(item: Menu) {
    this.menus.push(item);
    this.menus.sort((a: any, b: any) => {
      return a.priority - b.priority;
    });
  }

  addSlot(item: Slot) {
    this.slots.push(item);
  }

  getMenus() {
    return this.menus;
  }

  getSlots() {
    return this.slots;
  }

  getComponentsByName(name: string) {
    return this.slots
      .filter(item => item.name === name)
      .map(item => item.component);
  }
}
