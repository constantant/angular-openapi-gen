import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_GET_COMMENT } from './issues-get-comment.token';
import type { IssuesGetCommentResponse } from './issues-get-comment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/get-comment',
  path: '/repos/{owner}/{repo}/issues/comments/{comment_id}',
  method: 'get',
  tag: 'issues',
};

export function provideIssuesGetCommentMock(
  initialBehavior?: ProviderInitialBehavior<IssuesGetCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_GET_COMMENT,
    'ISSUES_GET_COMMENT',
    initialBehavior,
    _meta,
  );
}
