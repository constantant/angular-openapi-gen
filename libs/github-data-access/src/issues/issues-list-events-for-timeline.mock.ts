import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_LIST_EVENTS_FOR_TIMELINE } from './issues-list-events-for-timeline.token';
import type { IssuesListEventsForTimelineResponse } from './issues-list-events-for-timeline.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/list-events-for-timeline',
  path: '/repos/{owner}/{repo}/issues/{issue_number}/timeline',
  method: 'get',
  tag: 'issues',
};

export function provideIssuesListEventsForTimelineMock(
  initialBehavior?: ProviderInitialBehavior<IssuesListEventsForTimelineResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    ISSUES_LIST_EVENTS_FOR_TIMELINE,
    'ISSUES_LIST_EVENTS_FOR_TIMELINE',
    initialBehavior,
    _meta,
    options,
  );
}
