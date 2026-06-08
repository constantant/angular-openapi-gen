import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_REVIEWS_FOR_RUN } from './actions-get-reviews-for-run.token';
import type { ActionsGetReviewsForRunResponse } from './actions-get-reviews-for-run.token';

export function provideActionsGetReviewsForRunMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetReviewsForRunResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_REVIEWS_FOR_RUN,
    'ACTIONS_GET_REVIEWS_FOR_RUN',
    initialBehavior,
  );
}
