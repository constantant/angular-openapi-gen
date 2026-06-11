import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SECURITY_GET_REPOSITORIES_FOR_ENTERPRISE_CONFIGURATION } from './code-security-get-repositories-for-enterprise-configuration.token';
import type { CodeSecurityGetRepositoriesForEnterpriseConfigurationResponse } from './code-security-get-repositories-for-enterprise-configuration.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-security/get-repositories-for-enterprise-configuration',
  path: '/enterprises/{enterprise}/code-security/configurations/{configuration_id}/repositories',
  method: 'get',
  tag: 'code-security',
};

export function provideCodeSecurityGetRepositoriesForEnterpriseConfigurationMock(
  initialBehavior?: ProviderInitialBehavior<CodeSecurityGetRepositoriesForEnterpriseConfigurationResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SECURITY_GET_REPOSITORIES_FOR_ENTERPRISE_CONFIGURATION,
    'CODE_SECURITY_GET_REPOSITORIES_FOR_ENTERPRISE_CONFIGURATION',
    initialBehavior,
    _meta,
  );
}
