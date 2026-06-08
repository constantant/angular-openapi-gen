import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_LIST_COMMENTS_FOR_REPO } from './issues-list-comments-for-repo.token';
import type { IssuesListCommentsForRepoResponse } from './issues-list-comments-for-repo.token';

export function provideIssuesListCommentsForRepoMock(
  initialBehavior?: ProviderInitialBehavior<IssuesListCommentsForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_LIST_COMMENTS_FOR_REPO,
    'ISSUES_LIST_COMMENTS_FOR_REPO',
    initialBehavior,
  );
}
