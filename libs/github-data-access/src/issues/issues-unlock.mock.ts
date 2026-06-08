import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_UNLOCK } from './issues-unlock.token';

export function provideIssuesUnlockMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(ISSUES_UNLOCK, 'ISSUES_UNLOCK', initialBehavior);
}
