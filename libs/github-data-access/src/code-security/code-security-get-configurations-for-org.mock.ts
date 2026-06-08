import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_SECURITY_GET_CONFIGURATIONS_FOR_ORG } from './code-security-get-configurations-for-org.token';
import type { CodeSecurityGetConfigurationsForOrgResponse } from './code-security-get-configurations-for-org.token';

export function provideCodeSecurityGetConfigurationsForOrgMock(
  initialBehavior?: ProviderInitialBehavior<CodeSecurityGetConfigurationsForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SECURITY_GET_CONFIGURATIONS_FOR_ORG,
    'CODE_SECURITY_GET_CONFIGURATIONS_FOR_ORG',
    initialBehavior,
  );
}
