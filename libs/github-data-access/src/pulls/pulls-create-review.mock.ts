import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PULLS_CREATE_REVIEW } from './pulls-create-review.token';
import type { PullsCreateReviewResponse } from './pulls-create-review.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'pulls/create-review',
  path: '/repos/{owner}/{repo}/pulls/{pull_number}/reviews',
  method: 'post',
  tag: 'pulls',
};

export function providePullsCreateReviewMock(
  initialBehavior?: ProviderInitialBehavior<PullsCreateReviewResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_CREATE_REVIEW,
    'PULLS_CREATE_REVIEW',
    initialBehavior,
    _meta,
  );
}
