import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_SECURITY_DELETE_CONFIGURATION_FOR_ENTERPRISE } from './code-security-delete-configuration-for-enterprise.token';

export function provideCodeSecurityDeleteConfigurationForEnterpriseMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    CODE_SECURITY_DELETE_CONFIGURATION_FOR_ENTERPRISE,
    'CODE_SECURITY_DELETE_CONFIGURATION_FOR_ENTERPRISE',
    initialBehavior,
  );
}
