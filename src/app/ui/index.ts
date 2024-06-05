import vuetify from './vuetify';
import {setupComponents} from './components';
import {defineModule} from '@app/application';
import defaultLayout from './layouts/defaultLayout.vue';
import loginLayout from './layouts/loginLayout.vue';
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
