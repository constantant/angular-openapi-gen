import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_LIST_EVENTS_FOR_TIMELINE } from './issues-list-events-for-timeline.token';
import type { IssuesListEventsForTimelineResponse } from './issues-list-events-for-timeline.token';

export function provideIssuesListEventsForTimelineMock(
  initialBehavior?: ProviderInitialBehavior<IssuesListEventsForTimelineResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_LIST_EVENTS_FOR_TIMELINE,
    'ISSUES_LIST_EVENTS_FOR_TIMELINE',
    initialBehavior,
  );
}
