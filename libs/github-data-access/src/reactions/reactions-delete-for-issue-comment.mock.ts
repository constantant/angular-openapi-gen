import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REACTIONS_DELETE_FOR_ISSUE_COMMENT } from './reactions-delete-for-issue-comment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'reactions/delete-for-issue-comment',
  path: '/repos/{owner}/{repo}/issues/comments/{comment_id}/reactions/{reaction_id}',
  method: 'delete',
  tag: 'reactions',
};

export function provideReactionsDeleteForIssueCommentMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REACTIONS_DELETE_FOR_ISSUE_COMMENT,
    'REACTIONS_DELETE_FOR_ISSUE_COMMENT',
    initialBehavior,
    _meta,
  );
}
