import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_REVIEW_PENDING_DEPLOYMENTS_FOR_RUN } from './actions-review-pending-deployments-for-run.token';
import type { ActionsReviewPendingDeploymentsForRunResponse } from './actions-review-pending-deployments-for-run.token';

export function provideActionsReviewPendingDeploymentsForRunMock(
  initialBehavior?: ProviderInitialBehavior<ActionsReviewPendingDeploymentsForRunResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_REVIEW_PENDING_DEPLOYMENTS_FOR_RUN,
    'ACTIONS_REVIEW_PENDING_DEPLOYMENTS_FOR_RUN',
    initialBehavior,
  );
}
