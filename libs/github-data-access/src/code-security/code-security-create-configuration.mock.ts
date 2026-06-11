import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SECURITY_CREATE_CONFIGURATION } from './code-security-create-configuration.token';
import type { CodeSecurityCreateConfigurationResponse } from './code-security-create-configuration.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-security/create-configuration',
  path: '/orgs/{org}/code-security/configurations',
  method: 'post',
  tag: 'code-security',
};

export function provideCodeSecurityCreateConfigurationMock(
  initialBehavior?: ProviderInitialBehavior<CodeSecurityCreateConfigurationResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SECURITY_CREATE_CONFIGURATION,
    'CODE_SECURITY_CREATE_CONFIGURATION',
    initialBehavior,
    _meta,
  );
}
