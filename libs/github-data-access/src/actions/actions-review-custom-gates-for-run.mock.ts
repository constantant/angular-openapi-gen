import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_REVIEW_CUSTOM_GATES_FOR_RUN } from './actions-review-custom-gates-for-run.token';

export function provideActionsReviewCustomGatesForRunMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_REVIEW_CUSTOM_GATES_FOR_RUN,
    'ACTIONS_REVIEW_CUSTOM_GATES_FOR_RUN',
    initialBehavior,
  );
}
