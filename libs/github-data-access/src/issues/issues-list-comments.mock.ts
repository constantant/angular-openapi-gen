import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_LIST_COMMENTS } from './issues-list-comments.token';
import type { IssuesListCommentsResponse } from './issues-list-comments.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/list-comments',
  path: '/repos/{owner}/{repo}/issues/{issue_number}/comments',
  method: 'get',
  tag: 'issues',
};

export function provideIssuesListCommentsMock(
  initialBehavior?: ProviderInitialBehavior<IssuesListCommentsResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_LIST_COMMENTS,
    'ISSUES_LIST_COMMENTS',
    initialBehavior,
    _meta,
  );
}
