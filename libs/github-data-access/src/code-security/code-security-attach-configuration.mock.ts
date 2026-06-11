import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SECURITY_ATTACH_CONFIGURATION } from './code-security-attach-configuration.token';
import type { CodeSecurityAttachConfigurationResponse } from './code-security-attach-configuration.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-security/attach-configuration',
  path: '/orgs/{org}/code-security/configurations/{configuration_id}/attach',
  method: 'post',
  tag: 'code-security',
};

export function provideCodeSecurityAttachConfigurationMock(
  initialBehavior?: ProviderInitialBehavior<CodeSecurityAttachConfigurationResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SECURITY_ATTACH_CONFIGURATION,
    'CODE_SECURITY_ATTACH_CONFIGURATION',
    initialBehavior,
    _meta,
  );
}
