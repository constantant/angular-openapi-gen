import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_SECURITY_DETACH_CONFIGURATION } from './code-security-detach-configuration.token';

export function provideCodeSecurityDetachConfigurationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    CODE_SECURITY_DETACH_CONFIGURATION,
    'CODE_SECURITY_DETACH_CONFIGURATION',
    initialBehavior,
  );
}
