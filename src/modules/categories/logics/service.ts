import {BaseService} from '@app/utils';

export class CategoriesService extends BaseService {
  constructor() {
    super('/Admin/api/StuffCategories');
  }
}
