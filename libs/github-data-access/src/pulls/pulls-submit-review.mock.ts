import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PULLS_SUBMIT_REVIEW } from './pulls-submit-review.token';
import type { PullsSubmitReviewResponse } from './pulls-submit-review.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'pulls/submit-review',
  path: '/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/events',
  method: 'post',
  tag: 'pulls',
};

export function providePullsSubmitReviewMock(
  initialBehavior?: ProviderInitialBehavior<PullsSubmitReviewResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_SUBMIT_REVIEW,
    'PULLS_SUBMIT_REVIEW',
    initialBehavior,
    _meta,
  );
}
