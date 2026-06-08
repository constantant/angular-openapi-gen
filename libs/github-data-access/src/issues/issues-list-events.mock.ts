import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_LIST_EVENTS } from './issues-list-events.token';
import type { IssuesListEventsResponse } from './issues-list-events.token';

export function provideIssuesListEventsMock(
  initialBehavior?: ProviderInitialBehavior<IssuesListEventsResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_LIST_EVENTS,
    'ISSUES_LIST_EVENTS',
    initialBehavior,
  );
}
