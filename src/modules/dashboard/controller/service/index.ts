import {BaseService, RequestAxiosInstance} from '@dashboard/utils';

export class EmployeesManagementService extends BaseService {
  constructor(public $axios: RequestAxiosInstance) {
    super($axios, 'Employees');
  }
}
