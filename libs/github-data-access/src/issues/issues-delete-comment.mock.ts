import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_DELETE_COMMENT } from './issues-delete-comment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/delete-comment',
  path: '/repos/{owner}/{repo}/issues/comments/{comment_id}',
  method: 'delete',
  tag: 'issues',
};

export function provideIssuesDeleteCommentMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_DELETE_COMMENT,
    'ISSUES_DELETE_COMMENT',
    initialBehavior,
    _meta,
  );
}
