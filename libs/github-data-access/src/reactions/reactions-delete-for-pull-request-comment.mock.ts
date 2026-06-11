import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REACTIONS_DELETE_FOR_PULL_REQUEST_COMMENT } from './reactions-delete-for-pull-request-comment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'reactions/delete-for-pull-request-comment',
  path: '/repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions/{reaction_id}',
  method: 'delete',
  tag: 'reactions',
};

export function provideReactionsDeleteForPullRequestCommentMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REACTIONS_DELETE_FOR_PULL_REQUEST_COMMENT,
    'REACTIONS_DELETE_FOR_PULL_REQUEST_COMMENT',
    initialBehavior,
    _meta,
  );
}
