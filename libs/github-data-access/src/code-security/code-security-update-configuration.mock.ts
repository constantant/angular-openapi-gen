import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_SECURITY_UPDATE_CONFIGURATION } from './code-security-update-configuration.token';
import type { CodeSecurityUpdateConfigurationResponse } from './code-security-update-configuration.token';

export function provideCodeSecurityUpdateConfigurationMock(
  initialBehavior?: ProviderInitialBehavior<CodeSecurityUpdateConfigurationResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SECURITY_UPDATE_CONFIGURATION,
    'CODE_SECURITY_UPDATE_CONFIGURATION',
    initialBehavior,
  );
}
