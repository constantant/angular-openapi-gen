import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SECURITY_UPDATE_CONFIGURATION } from './code-security-update-configuration.token';
import type { CodeSecurityUpdateConfigurationResponse } from './code-security-update-configuration.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-security/update-configuration',
  path: '/orgs/{org}/code-security/configurations/{configuration_id}',
  method: 'patch',
  tag: 'code-security',
};

export function provideCodeSecurityUpdateConfigurationMock(
  initialBehavior?: ProviderInitialBehavior<CodeSecurityUpdateConfigurationResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SECURITY_UPDATE_CONFIGURATION,
    'CODE_SECURITY_UPDATE_CONFIGURATION',
    initialBehavior,
    _meta,
  );
}
