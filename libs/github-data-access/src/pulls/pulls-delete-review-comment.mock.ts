import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PULLS_DELETE_REVIEW_COMMENT } from './pulls-delete-review-comment.token';

export function providePullsDeleteReviewCommentMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    PULLS_DELETE_REVIEW_COMMENT,
    'PULLS_DELETE_REVIEW_COMMENT',
    initialBehavior,
  );
}
