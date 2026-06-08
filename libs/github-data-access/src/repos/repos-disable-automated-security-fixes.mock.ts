import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_DISABLE_AUTOMATED_SECURITY_FIXES } from './repos-disable-automated-security-fixes.token';

export function provideReposDisableAutomatedSecurityFixesMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DISABLE_AUTOMATED_SECURITY_FIXES,
    'REPOS_DISABLE_AUTOMATED_SECURITY_FIXES',
    initialBehavior,
  );
}
