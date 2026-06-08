import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_SECURITY_DELETE_CONFIGURATION } from './code-security-delete-configuration.token';

export function provideCodeSecurityDeleteConfigurationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    CODE_SECURITY_DELETE_CONFIGURATION,
    'CODE_SECURITY_DELETE_CONFIGURATION',
    initialBehavior,
  );
}
