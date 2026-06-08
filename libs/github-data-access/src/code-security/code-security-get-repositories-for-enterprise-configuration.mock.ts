import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_SECURITY_GET_REPOSITORIES_FOR_ENTERPRISE_CONFIGURATION } from './code-security-get-repositories-for-enterprise-configuration.token';
import type { CodeSecurityGetRepositoriesForEnterpriseConfigurationResponse } from './code-security-get-repositories-for-enterprise-configuration.token';

export function provideCodeSecurityGetRepositoriesForEnterpriseConfigurationMock(
  initialBehavior?: ProviderInitialBehavior<CodeSecurityGetRepositoriesForEnterpriseConfigurationResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SECURITY_GET_REPOSITORIES_FOR_ENTERPRISE_CONFIGURATION,
    'CODE_SECURITY_GET_REPOSITORIES_FOR_ENTERPRISE_CONFIGURATION',
    initialBehavior,
  );
}
