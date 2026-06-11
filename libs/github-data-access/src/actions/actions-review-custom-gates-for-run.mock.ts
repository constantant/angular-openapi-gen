import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_REVIEW_CUSTOM_GATES_FOR_RUN } from './actions-review-custom-gates-for-run.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/review-custom-gates-for-run',
  path: '/repos/{owner}/{repo}/actions/runs/{run_id}/deployment_protection_rule',
  method: 'post',
  tag: 'actions',
};

export function provideActionsReviewCustomGatesForRunMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_REVIEW_CUSTOM_GATES_FOR_RUN,
    'ACTIONS_REVIEW_CUSTOM_GATES_FOR_RUN',
    initialBehavior,
    _meta,
  );
}
