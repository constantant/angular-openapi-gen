import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SECURITY_DELETE_CONFIGURATION } from './code-security-delete-configuration.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-security/delete-configuration',
  path: '/orgs/{org}/code-security/configurations/{configuration_id}',
  method: 'delete',
  tag: 'code-security',
};

export function provideCodeSecurityDeleteConfigurationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    CODE_SECURITY_DELETE_CONFIGURATION,
    'CODE_SECURITY_DELETE_CONFIGURATION',
    initialBehavior,
    _meta,
  );
}
