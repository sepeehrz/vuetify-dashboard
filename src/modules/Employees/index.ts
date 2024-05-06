import {defineModule} from '@app/application';
import {EmployeesManagementScope} from './helpers/index';
export default defineModule(({router, scope}) => {
  EmployeesManagementScope(scope);

  router.addRoute('main', {
    name: 'employees',
    path: '/employees',
    component: () => import('./presentation/List/index.vue'),
    meta: {
      module: 'employees'
    }
  });
  // router.addRoute('main', {
  //   name: 'employees-edit',
  //   path: '/employees/:id',
  //   component: () => import('./presentation/form/index.vue')
  // });
  router.addRoute('main', {
    name: 'employees-create',
    path: '/employees/create',
    component: () => import('./presentation/form/index.vue'),
    meta: {
      module: 'employees'
    }
  });
  router.addRoute('main', {
    name: 'employees-edit',
    path: '/employees/:id',
    component: () => import('./presentation/form/navigation.vue'),
    meta: {
      module: 'employees'
    },
    children: [
      {
        path: 'info',
        component: () => import('./presentation/form/index.vue')
      },
      {
        path: 'installments',
        component: () => import('./presentation/form/comp2.vue')
      },
      {
        path: 'assets',
        component: () => import('./presentation/form/comp3.vue')
      }
    ]
  });
});
