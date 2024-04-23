import {Axios} from '@dashboard/utils';
import {DashboardService} from './service/index';
import type {Scope} from '@dashboard/jection';

export function DashboardScope(scope: Scope) {
  scope.single(DashboardService, [Axios]);
}
