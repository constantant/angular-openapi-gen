import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_LIST_COMMENTS_FOR_REPO } from './issues-list-comments-for-repo.token';
import type { IssuesListCommentsForRepoResponse } from './issues-list-comments-for-repo.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/list-comments-for-repo',
  path: '/repos/{owner}/{repo}/issues/comments',
  method: 'get',
  tag: 'issues',
};

export function provideIssuesListCommentsForRepoMock(
  initialBehavior?: ProviderInitialBehavior<IssuesListCommentsForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_LIST_COMMENTS_FOR_REPO,
    'ISSUES_LIST_COMMENTS_FOR_REPO',
    initialBehavior,
    _meta,
  );
}
