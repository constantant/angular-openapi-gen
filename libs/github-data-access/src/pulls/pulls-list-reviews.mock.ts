import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PULLS_LIST_REVIEWS } from './pulls-list-reviews.token';
import type { PullsListReviewsResponse } from './pulls-list-reviews.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'pulls/list-reviews',
  path: '/repos/{owner}/{repo}/pulls/{pull_number}/reviews',
  method: 'get',
  tag: 'pulls',
};

export function providePullsListReviewsMock(
  initialBehavior?: ProviderInitialBehavior<PullsListReviewsResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_LIST_REVIEWS,
    'PULLS_LIST_REVIEWS',
    initialBehavior,
    _meta,
  );
}
