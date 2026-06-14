import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SECURITY_DETACH_CONFIGURATION } from './code-security-detach-configuration.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-security/detach-configuration',
  path: '/orgs/{org}/code-security/configurations/detach',
  method: 'delete',
  tag: 'code-security',
};

export function provideCodeSecurityDetachConfigurationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    CODE_SECURITY_DETACH_CONFIGURATION,
    'CODE_SECURITY_DETACH_CONFIGURATION',
    initialBehavior,
    _meta,
    options,
  );
}
