import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_CREATE } from './issues-create.token';
import type { IssuesCreateResponse } from './issues-create.token';

export function provideIssuesCreateMock(
  initialBehavior?: ProviderInitialBehavior<IssuesCreateResponse>,
): FactoryProvider {
  return provideMockResource(ISSUES_CREATE, 'ISSUES_CREATE', initialBehavior);
}
