import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REACTIONS_DELETE_FOR_PULL_REQUEST_COMMENT } from './reactions-delete-for-pull-request-comment.token';

export function provideReactionsDeleteForPullRequestCommentMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REACTIONS_DELETE_FOR_PULL_REQUEST_COMMENT,
    'REACTIONS_DELETE_FOR_PULL_REQUEST_COMMENT',
    initialBehavior,
  );
}
