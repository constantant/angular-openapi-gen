import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PULLS_GET_REVIEW } from './pulls-get-review.token';
import type { PullsGetReviewResponse } from './pulls-get-review.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'pulls/get-review',
  path: '/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}',
  method: 'get',
  tag: 'pulls',
};

export function providePullsGetReviewMock(
  initialBehavior?: ProviderInitialBehavior<PullsGetReviewResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_GET_REVIEW,
    'PULLS_GET_REVIEW',
    initialBehavior,
    _meta,
  );
}
