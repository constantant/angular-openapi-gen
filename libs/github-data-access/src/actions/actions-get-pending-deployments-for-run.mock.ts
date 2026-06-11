import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_PENDING_DEPLOYMENTS_FOR_RUN } from './actions-get-pending-deployments-for-run.token';
import type { ActionsGetPendingDeploymentsForRunResponse } from './actions-get-pending-deployments-for-run.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-pending-deployments-for-run',
  path: '/repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetPendingDeploymentsForRunMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetPendingDeploymentsForRunResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_PENDING_DEPLOYMENTS_FOR_RUN,
    'ACTIONS_GET_PENDING_DEPLOYMENTS_FOR_RUN',
    initialBehavior,
    _meta,
  );
}
