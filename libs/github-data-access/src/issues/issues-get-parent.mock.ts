import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_GET_PARENT } from './issues-get-parent.token';
import type { IssuesGetParentResponse } from './issues-get-parent.token';

export function provideIssuesGetParentMock(
  initialBehavior?: ProviderInitialBehavior<IssuesGetParentResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_GET_PARENT,
    'ISSUES_GET_PARENT',
    initialBehavior,
  );
}
