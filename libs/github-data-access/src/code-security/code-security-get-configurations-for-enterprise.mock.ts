import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_SECURITY_GET_CONFIGURATIONS_FOR_ENTERPRISE } from './code-security-get-configurations-for-enterprise.token';
import type { CodeSecurityGetConfigurationsForEnterpriseResponse } from './code-security-get-configurations-for-enterprise.token';

export function provideCodeSecurityGetConfigurationsForEnterpriseMock(
  initialBehavior?: ProviderInitialBehavior<CodeSecurityGetConfigurationsForEnterpriseResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SECURITY_GET_CONFIGURATIONS_FOR_ENTERPRISE,
    'CODE_SECURITY_GET_CONFIGURATIONS_FOR_ENTERPRISE',
    initialBehavior,
  );
}
