import {App, Plugin} from 'vue';
import {createRouter, createWebHistory} from 'vue-router';
import type {Router} from 'vue-router';
import {Layout} from './Layout';
import {Scope, assignGlobalScope, getGlobalScope} from '@dashboard/jection';
import {UiModule} from '@dashboard/ui';
import {Axios} from '@dashboard/utils';
import {NavigationMenu} from '@dashboard/utils';
type ModuleSetupContext = {
  app: App;
  router: Router;
  scope: Scope;
  layout: Layout;
};

type Module = (context: ModuleSetupContext) => void;

export function defineModule(setup: Module) {
  return setup;
}

export const startApplication: Plugin = (app: App) => {
  const scope = new Scope();
  assignGlobalScope(scope);

  scope.single(Layout);
  scope.single(Axios);
  scope.single(NavigationMenu);

  const router = createRouter({
    history: createWebHistory(),
    routes: []
  });

  const context: ModuleSetupContext = {
    app,
    router,
    scope: scope,
    layout: scope.get(Layout)
  };
  UiModule(context);

  const modulesPaths: any = import.meta.glob('../../modules/*/index.ts', {
    eager: true
  });
  for (const path in modulesPaths) {
    const setup = modulesPaths[path].default as Module | undefined;
    if (setup) {
      setup(context);
    }
  }

  app.use(router);
};
export const get: Scope['get'] = creator => getGlobalScope().get(creator);
