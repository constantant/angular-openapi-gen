import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SECURITY_ATTACH_ENTERPRISE_CONFIGURATION } from './code-security-attach-enterprise-configuration.token';
import type { CodeSecurityAttachEnterpriseConfigurationResponse } from './code-security-attach-enterprise-configuration.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-security/attach-enterprise-configuration',
  path: '/enterprises/{enterprise}/code-security/configurations/{configuration_id}/attach',
  method: 'post',
  tag: 'code-security',
};

export function provideCodeSecurityAttachEnterpriseConfigurationMock(
  initialBehavior?: ProviderInitialBehavior<CodeSecurityAttachEnterpriseConfigurationResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SECURITY_ATTACH_ENTERPRISE_CONFIGURATION,
    'CODE_SECURITY_ATTACH_ENTERPRISE_CONFIGURATION',
    initialBehavior,
    _meta,
  );
}
