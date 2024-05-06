import {App, Plugin} from 'vue';
import {createRouter, createWebHistory} from 'vue-router';
import type {Router} from 'vue-router';
import {Scope, assignGlobalScope, getGlobalScope} from '@app/jection';
import {UiModule} from '@app/ui';
import {Axios} from '@app/utils';
import {NavigationMenu} from '@app/utils';
type ModuleSetupContext = {
  app: App;
  router: Router;
  scope: Scope;
};

type Module = (context: ModuleSetupContext) => void;

export function defineModule(setup: Module) {
  return setup;
}

export const startApplication: Plugin = (app: App) => {
  const scope = new Scope();
  assignGlobalScope(scope);

  scope.single(Axios);
  scope.single(NavigationMenu);

  const router = createRouter({
    history: createWebHistory(),
    routes: []
  });

  const context: ModuleSetupContext = {
    app,
    router,
    scope: scope
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
