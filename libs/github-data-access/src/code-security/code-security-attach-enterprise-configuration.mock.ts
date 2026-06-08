import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_SECURITY_ATTACH_ENTERPRISE_CONFIGURATION } from './code-security-attach-enterprise-configuration.token';
import type { CodeSecurityAttachEnterpriseConfigurationResponse } from './code-security-attach-enterprise-configuration.token';

export function provideCodeSecurityAttachEnterpriseConfigurationMock(
  initialBehavior?: ProviderInitialBehavior<CodeSecurityAttachEnterpriseConfigurationResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SECURITY_ATTACH_ENTERPRISE_CONFIGURATION,
    'CODE_SECURITY_ATTACH_ENTERPRISE_CONFIGURATION',
    initialBehavior,
  );
}
