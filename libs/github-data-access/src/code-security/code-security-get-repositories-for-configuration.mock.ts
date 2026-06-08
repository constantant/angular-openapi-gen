import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_SECURITY_GET_REPOSITORIES_FOR_CONFIGURATION } from './code-security-get-repositories-for-configuration.token';
import type { CodeSecurityGetRepositoriesForConfigurationResponse } from './code-security-get-repositories-for-configuration.token';

export function provideCodeSecurityGetRepositoriesForConfigurationMock(
  initialBehavior?: ProviderInitialBehavior<CodeSecurityGetRepositoriesForConfigurationResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SECURITY_GET_REPOSITORIES_FOR_CONFIGURATION,
    'CODE_SECURITY_GET_REPOSITORIES_FOR_CONFIGURATION',
    initialBehavior,
  );
}
