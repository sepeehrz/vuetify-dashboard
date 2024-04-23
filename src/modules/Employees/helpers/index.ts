import {Axios} from '@dashboard/utils';
import {EmployeesManagementService} from './service/index';
import type {Scope} from '@dashboard/jection';

export function EmployeesManagementScope(scope: Scope) {
  scope.single(EmployeesManagementService, [Axios]);
}
