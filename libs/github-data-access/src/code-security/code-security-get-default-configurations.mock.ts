import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_SECURITY_GET_DEFAULT_CONFIGURATIONS } from './code-security-get-default-configurations.token';
import type { CodeSecurityGetDefaultConfigurationsResponse } from './code-security-get-default-configurations.token';

export function provideCodeSecurityGetDefaultConfigurationsMock(
  initialBehavior?: ProviderInitialBehavior<CodeSecurityGetDefaultConfigurationsResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SECURITY_GET_DEFAULT_CONFIGURATIONS,
    'CODE_SECURITY_GET_DEFAULT_CONFIGURATIONS',
    initialBehavior,
  );
}
