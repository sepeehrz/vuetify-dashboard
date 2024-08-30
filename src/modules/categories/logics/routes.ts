import type {Router} from 'vue-router';

export function CategoriesRoutes(router: Router) {
  router.addRoute('main', {
    name: 'categories',
    path: '/categories',
    component: () => import('../presentation/List/index.vue'),
    meta: {
      module: 'categories'
    }
  });
  router.addRoute('main', {
    name: 'categories-create',
    path: '/categories/create',
    component: () => import('../presentation/form/information/form.vue'),
    meta: {
      module: 'categories'
    }
  });
  router.addRoute('main', {
    name: 'categories-edit',
    path: '/categories/:id',
    component: () => import('../presentation/form/information/form.vue'),
    meta: {
      module: 'categories'
    }
  });
}
