import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_LIST_LABELS_FOR_REPO } from './issues-list-labels-for-repo.token';
import type { IssuesListLabelsForRepoResponse } from './issues-list-labels-for-repo.token';

export function provideIssuesListLabelsForRepoMock(
  initialBehavior?: ProviderInitialBehavior<IssuesListLabelsForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_LIST_LABELS_FOR_REPO,
    'ISSUES_LIST_LABELS_FOR_REPO',
    initialBehavior,
  );
}
