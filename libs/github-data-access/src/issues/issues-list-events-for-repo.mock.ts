import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_LIST_EVENTS_FOR_REPO } from './issues-list-events-for-repo.token';
import type { IssuesListEventsForRepoResponse } from './issues-list-events-for-repo.token';

export function provideIssuesListEventsForRepoMock(
  initialBehavior?: ProviderInitialBehavior<IssuesListEventsForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_LIST_EVENTS_FOR_REPO,
    'ISSUES_LIST_EVENTS_FOR_REPO',
    initialBehavior,
  );
}
