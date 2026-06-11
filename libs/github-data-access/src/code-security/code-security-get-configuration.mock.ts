import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SECURITY_GET_CONFIGURATION } from './code-security-get-configuration.token';
import type { CodeSecurityGetConfigurationResponse } from './code-security-get-configuration.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-security/get-configuration',
  path: '/orgs/{org}/code-security/configurations/{configuration_id}',
  method: 'get',
  tag: 'code-security',
};

export function provideCodeSecurityGetConfigurationMock(
  initialBehavior?: ProviderInitialBehavior<CodeSecurityGetConfigurationResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SECURITY_GET_CONFIGURATION,
    'CODE_SECURITY_GET_CONFIGURATION',
    initialBehavior,
    _meta,
  );
}
