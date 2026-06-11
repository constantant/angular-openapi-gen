import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REACTIONS_CREATE_FOR_ISSUE_COMMENT } from './reactions-create-for-issue-comment.token';
import type { ReactionsCreateForIssueCommentResponse } from './reactions-create-for-issue-comment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'reactions/create-for-issue-comment',
  path: '/repos/{owner}/{repo}/issues/comments/{comment_id}/reactions',
  method: 'post',
  tag: 'reactions',
};

export function provideReactionsCreateForIssueCommentMock(
  initialBehavior?: ProviderInitialBehavior<ReactionsCreateForIssueCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    REACTIONS_CREATE_FOR_ISSUE_COMMENT,
    'REACTIONS_CREATE_FOR_ISSUE_COMMENT',
    initialBehavior,
    _meta,
  );
}
