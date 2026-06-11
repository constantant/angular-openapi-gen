import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_GET_EVENT } from './issues-get-event.token';
import type { IssuesGetEventResponse } from './issues-get-event.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/get-event',
  path: '/repos/{owner}/{repo}/issues/events/{event_id}',
  method: 'get',
  tag: 'issues',
};

export function provideIssuesGetEventMock(
  initialBehavior?: ProviderInitialBehavior<IssuesGetEventResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_GET_EVENT,
    'ISSUES_GET_EVENT',
    initialBehavior,
    _meta,
  );
}
