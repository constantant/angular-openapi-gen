import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_UPDATE } from './issues-update.token';
import type { IssuesUpdateResponse } from './issues-update.token';

export function provideIssuesUpdateMock(
  initialBehavior?: ProviderInitialBehavior<IssuesUpdateResponse>,
): FactoryProvider {
  return provideMockResource(ISSUES_UPDATE, 'ISSUES_UPDATE', initialBehavior);
}
