import {defineModule} from '@dashboard/application';

export default defineModule(({router}) => {
  router.addRoute('login', {
    name: 'Login',
    path: '/Login',
    component: () => import('./presentation/index.vue')
  });
});
