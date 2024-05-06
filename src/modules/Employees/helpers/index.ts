import {Axios} from '@app/utils';
import {EmployeesManagementService} from './service/index';
import type {Scope} from '@app/jection';

export function EmployeesManagementScope(scope: Scope) {
  scope.single(EmployeesManagementService, [Axios]);
}
