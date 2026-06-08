import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_PENDING_DEPLOYMENTS_FOR_RUN } from './actions-get-pending-deployments-for-run.token';
import type { ActionsGetPendingDeploymentsForRunResponse } from './actions-get-pending-deployments-for-run.token';

export function provideActionsGetPendingDeploymentsForRunMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetPendingDeploymentsForRunResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_PENDING_DEPLOYMENTS_FOR_RUN,
    'ACTIONS_GET_PENDING_DEPLOYMENTS_FOR_RUN',
    initialBehavior,
  );
}
