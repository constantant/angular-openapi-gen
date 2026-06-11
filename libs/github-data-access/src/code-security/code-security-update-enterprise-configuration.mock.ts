import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SECURITY_UPDATE_ENTERPRISE_CONFIGURATION } from './code-security-update-enterprise-configuration.token';
import type { CodeSecurityUpdateEnterpriseConfigurationResponse } from './code-security-update-enterprise-configuration.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-security/update-enterprise-configuration',
  path: '/enterprises/{enterprise}/code-security/configurations/{configuration_id}',
  method: 'patch',
  tag: 'code-security',
};

export function provideCodeSecurityUpdateEnterpriseConfigurationMock(
  initialBehavior?: ProviderInitialBehavior<CodeSecurityUpdateEnterpriseConfigurationResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SECURITY_UPDATE_ENTERPRISE_CONFIGURATION,
    'CODE_SECURITY_UPDATE_ENTERPRISE_CONFIGURATION',
    initialBehavior,
    _meta,
  );
}
