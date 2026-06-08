import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_LIST_FOR_REPO } from './issues-list-for-repo.token';
import type { IssuesListForRepoResponse } from './issues-list-for-repo.token';

export function provideIssuesListForRepoMock(
  initialBehavior?: ProviderInitialBehavior<IssuesListForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_LIST_FOR_REPO,
    'ISSUES_LIST_FOR_REPO',
    initialBehavior,
  );
}
