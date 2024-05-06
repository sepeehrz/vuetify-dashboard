import {Axios} from '@app/utils';
import {DashboardService} from './service/index';
import type {Scope} from '@app/jection';

export function DashboardScope(scope: Scope) {
  scope.single(DashboardService, [Axios]);
}
