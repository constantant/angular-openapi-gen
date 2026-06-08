import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_LOCK } from './issues-lock.token';

export function provideIssuesLockMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(ISSUES_LOCK, 'ISSUES_LOCK', initialBehavior);
}
