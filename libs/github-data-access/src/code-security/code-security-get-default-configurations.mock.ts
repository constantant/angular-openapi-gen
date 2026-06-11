import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SECURITY_GET_DEFAULT_CONFIGURATIONS } from './code-security-get-default-configurations.token';
import type { CodeSecurityGetDefaultConfigurationsResponse } from './code-security-get-default-configurations.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-security/get-default-configurations',
  path: '/orgs/{org}/code-security/configurations/defaults',
  method: 'get',
  tag: 'code-security',
};

export function provideCodeSecurityGetDefaultConfigurationsMock(
  initialBehavior?: ProviderInitialBehavior<CodeSecurityGetDefaultConfigurationsResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SECURITY_GET_DEFAULT_CONFIGURATIONS,
    'CODE_SECURITY_GET_DEFAULT_CONFIGURATIONS',
    initialBehavior,
    _meta,
  );
}
