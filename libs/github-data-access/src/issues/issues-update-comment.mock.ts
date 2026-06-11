import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_UPDATE_COMMENT } from './issues-update-comment.token';
import type { IssuesUpdateCommentResponse } from './issues-update-comment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/update-comment',
  path: '/repos/{owner}/{repo}/issues/comments/{comment_id}',
  method: 'patch',
  tag: 'issues',
};

export function provideIssuesUpdateCommentMock(
  initialBehavior?: ProviderInitialBehavior<IssuesUpdateCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_UPDATE_COMMENT,
    'ISSUES_UPDATE_COMMENT',
    initialBehavior,
    _meta,
  );
}
