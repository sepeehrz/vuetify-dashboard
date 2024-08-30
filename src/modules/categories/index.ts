import {defineModule} from '@app/application';
import {CategoriesRoutes} from './logics/routes';
export default defineModule(({router}) => {
  CategoriesRoutes(router);
});
