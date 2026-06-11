import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REACTIONS_LIST_FOR_ISSUE_COMMENT } from './reactions-list-for-issue-comment.token';
import type { ReactionsListForIssueCommentResponse } from './reactions-list-for-issue-comment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'reactions/list-for-issue-comment',
  path: '/repos/{owner}/{repo}/issues/comments/{comment_id}/reactions',
  method: 'get',
  tag: 'reactions',
};

export function provideReactionsListForIssueCommentMock(
  initialBehavior?: ProviderInitialBehavior<ReactionsListForIssueCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    REACTIONS_LIST_FOR_ISSUE_COMMENT,
    'REACTIONS_LIST_FOR_ISSUE_COMMENT',
    initialBehavior,
    _meta,
  );
}
