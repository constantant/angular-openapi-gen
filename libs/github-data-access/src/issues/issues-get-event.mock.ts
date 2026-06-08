import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_GET_EVENT } from './issues-get-event.token';
import type { IssuesGetEventResponse } from './issues-get-event.token';

export function provideIssuesGetEventMock(
  initialBehavior?: ProviderInitialBehavior<IssuesGetEventResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_GET_EVENT,
    'ISSUES_GET_EVENT',
    initialBehavior,
  );
}
