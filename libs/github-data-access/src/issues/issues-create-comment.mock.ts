import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_CREATE_COMMENT } from './issues-create-comment.token';
import type { IssuesCreateCommentResponse } from './issues-create-comment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/create-comment',
  path: '/repos/{owner}/{repo}/issues/{issue_number}/comments',
  method: 'post',
  tag: 'issues',
};

export function provideIssuesCreateCommentMock(
  initialBehavior?: ProviderInitialBehavior<IssuesCreateCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_CREATE_COMMENT,
    'ISSUES_CREATE_COMMENT',
    initialBehavior,
    _meta,
  );
}
