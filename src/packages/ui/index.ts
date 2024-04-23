import vuetify from './vuetify';
import {setupComponents} from './components';
import {defineModule} from '@dashboard/application';
import defaultLayout from './presentation/layouts/defaultLayout.vue';
import loginLayout from './presentation/layouts/loginLayout.vue';
import './assets/style/app.scss';

export const UiModule = defineModule(({app, router}) => {
  app.use(vuetify);

  setupComponents(app);

  router.addRoute({
    name: 'main',
    path: '/',
    component: defaultLayout
  });

  router.addRoute({
    name: 'login',
    path: '/',
    component: loginLayout
  });
});
