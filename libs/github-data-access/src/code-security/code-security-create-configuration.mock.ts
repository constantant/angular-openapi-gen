import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_SECURITY_CREATE_CONFIGURATION } from './code-security-create-configuration.token';
import type { CodeSecurityCreateConfigurationResponse } from './code-security-create-configuration.token';

export function provideCodeSecurityCreateConfigurationMock(
  initialBehavior?: ProviderInitialBehavior<CodeSecurityCreateConfigurationResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SECURITY_CREATE_CONFIGURATION,
    'CODE_SECURITY_CREATE_CONFIGURATION',
    initialBehavior,
  );
}
