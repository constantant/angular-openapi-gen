import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PULLS_UPDATE_REVIEW } from './pulls-update-review.token';
import type { PullsUpdateReviewResponse } from './pulls-update-review.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'pulls/update-review',
  path: '/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}',
  method: 'put',
  tag: 'pulls',
};

export function providePullsUpdateReviewMock(
  initialBehavior?: ProviderInitialBehavior<PullsUpdateReviewResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_UPDATE_REVIEW,
    'PULLS_UPDATE_REVIEW',
    initialBehavior,
    _meta,
  );
}
