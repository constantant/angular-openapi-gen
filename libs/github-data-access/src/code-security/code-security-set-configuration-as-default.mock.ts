import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_SECURITY_SET_CONFIGURATION_AS_DEFAULT } from './code-security-set-configuration-as-default.token';
import type { CodeSecuritySetConfigurationAsDefaultResponse } from './code-security-set-configuration-as-default.token';

export function provideCodeSecuritySetConfigurationAsDefaultMock(
  initialBehavior?: ProviderInitialBehavior<CodeSecuritySetConfigurationAsDefaultResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SECURITY_SET_CONFIGURATION_AS_DEFAULT,
    'CODE_SECURITY_SET_CONFIGURATION_AS_DEFAULT',
    initialBehavior,
  );
}
