import {BaseService, RequestAxiosInstance} from '@app/utils';

export class EmployeesManagementService extends BaseService {
  constructor(public $axios: RequestAxiosInstance) {
    super($axios, 'Employees');
  }
}
