import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_SECURITY_CREATE_CONFIGURATION_FOR_ENTERPRISE } from './code-security-create-configuration-for-enterprise.token';
import type { CodeSecurityCreateConfigurationForEnterpriseResponse } from './code-security-create-configuration-for-enterprise.token';

export function provideCodeSecurityCreateConfigurationForEnterpriseMock(
  initialBehavior?: ProviderInitialBehavior<CodeSecurityCreateConfigurationForEnterpriseResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SECURITY_CREATE_CONFIGURATION_FOR_ENTERPRISE,
    'CODE_SECURITY_CREATE_CONFIGURATION_FOR_ENTERPRISE',
    initialBehavior,
  );
}
