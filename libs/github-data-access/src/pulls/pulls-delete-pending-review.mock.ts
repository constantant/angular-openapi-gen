import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PULLS_DELETE_PENDING_REVIEW } from './pulls-delete-pending-review.token';
import type { PullsDeletePendingReviewResponse } from './pulls-delete-pending-review.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'pulls/delete-pending-review',
  path: '/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}',
  method: 'delete',
  tag: 'pulls',
};

export function providePullsDeletePendingReviewMock(
  initialBehavior?: ProviderInitialBehavior<PullsDeletePendingReviewResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_DELETE_PENDING_REVIEW,
    'PULLS_DELETE_PENDING_REVIEW',
    initialBehavior,
    _meta,
  );
}
