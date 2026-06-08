import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_GET } from './issues-get.token';
import type { IssuesGetResponse } from './issues-get.token';

export function provideIssuesGetMock(
  initialBehavior?: ProviderInitialBehavior<IssuesGetResponse>,
): FactoryProvider {
  return provideMockResource(ISSUES_GET, 'ISSUES_GET', initialBehavior);
}
