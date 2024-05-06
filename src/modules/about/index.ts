import {defineModule} from '@app/application';

export default defineModule(({router}) => {
  router.addRoute('main', {
    name: 'About',
    path: '/about',
    component: () => import('./presentation/index.vue')
  });
});
