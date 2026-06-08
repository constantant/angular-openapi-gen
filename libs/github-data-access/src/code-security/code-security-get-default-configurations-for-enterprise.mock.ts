import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_SECURITY_GET_DEFAULT_CONFIGURATIONS_FOR_ENTERPRISE } from './code-security-get-default-configurations-for-enterprise.token';
import type { CodeSecurityGetDefaultConfigurationsForEnterpriseResponse } from './code-security-get-default-configurations-for-enterprise.token';

export function provideCodeSecurityGetDefaultConfigurationsForEnterpriseMock(
  initialBehavior?: ProviderInitialBehavior<CodeSecurityGetDefaultConfigurationsForEnterpriseResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SECURITY_GET_DEFAULT_CONFIGURATIONS_FOR_ENTERPRISE,
    'CODE_SECURITY_GET_DEFAULT_CONFIGURATIONS_FOR_ENTERPRISE',
    initialBehavior,
  );
}
