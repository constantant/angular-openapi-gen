import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SECURITY_GET_REPOSITORIES_FOR_CONFIGURATION } from './code-security-get-repositories-for-configuration.token';
import type { CodeSecurityGetRepositoriesForConfigurationResponse } from './code-security-get-repositories-for-configuration.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-security/get-repositories-for-configuration',
  path: '/orgs/{org}/code-security/configurations/{configuration_id}/repositories',
  method: 'get',
  tag: 'code-security',
};

export function provideCodeSecurityGetRepositoriesForConfigurationMock(
  initialBehavior?: ProviderInitialBehavior<CodeSecurityGetRepositoriesForConfigurationResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SECURITY_GET_REPOSITORIES_FOR_CONFIGURATION,
    'CODE_SECURITY_GET_REPOSITORIES_FOR_CONFIGURATION',
    initialBehavior,
    _meta,
  );
}
