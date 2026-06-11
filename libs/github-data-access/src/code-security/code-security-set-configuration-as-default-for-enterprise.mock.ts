import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SECURITY_SET_CONFIGURATION_AS_DEFAULT_FOR_ENTERPRISE } from './code-security-set-configuration-as-default-for-enterprise.token';
import type { CodeSecuritySetConfigurationAsDefaultForEnterpriseResponse } from './code-security-set-configuration-as-default-for-enterprise.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-security/set-configuration-as-default-for-enterprise',
  path: '/enterprises/{enterprise}/code-security/configurations/{configuration_id}/defaults',
  method: 'put',
  tag: 'code-security',
};

export function provideCodeSecuritySetConfigurationAsDefaultForEnterpriseMock(
  initialBehavior?: ProviderInitialBehavior<CodeSecuritySetConfigurationAsDefaultForEnterpriseResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SECURITY_SET_CONFIGURATION_AS_DEFAULT_FOR_ENTERPRISE,
    'CODE_SECURITY_SET_CONFIGURATION_AS_DEFAULT_FOR_ENTERPRISE',
    initialBehavior,
    _meta,
  );
}
