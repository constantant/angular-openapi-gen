import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PULLS_DISMISS_REVIEW } from './pulls-dismiss-review.token';
import type { PullsDismissReviewResponse } from './pulls-dismiss-review.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'pulls/dismiss-review',
  path: '/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/dismissals',
  method: 'put',
  tag: 'pulls',
};

export function providePullsDismissReviewMock(
  initialBehavior?: ProviderInitialBehavior<PullsDismissReviewResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_DISMISS_REVIEW,
    'PULLS_DISMISS_REVIEW',
    initialBehavior,
    _meta,
  );
}
