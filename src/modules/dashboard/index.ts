import {defineModule} from '@app/application';
import {EmployeesManagementScope} from './controller/index';
export default defineModule(({router, scope}) => {
  // EmployeesManagementScope(scope);

  router.addRoute('main', {
    name: 'test',
    path: '/test',
    component: () => import('./presentation/list.vue')
  });
  router.addRoute('main', {
    name: 'test-edit',
    path: '/test/:id',
    component: () => import('./presentation/form.vue')
  });
});
