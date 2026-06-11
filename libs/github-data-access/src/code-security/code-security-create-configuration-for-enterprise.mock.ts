import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SECURITY_CREATE_CONFIGURATION_FOR_ENTERPRISE } from './code-security-create-configuration-for-enterprise.token';
import type { CodeSecurityCreateConfigurationForEnterpriseResponse } from './code-security-create-configuration-for-enterprise.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-security/create-configuration-for-enterprise',
  path: '/enterprises/{enterprise}/code-security/configurations',
  method: 'post',
  tag: 'code-security',
};

export function provideCodeSecurityCreateConfigurationForEnterpriseMock(
  initialBehavior?: ProviderInitialBehavior<CodeSecurityCreateConfigurationForEnterpriseResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SECURITY_CREATE_CONFIGURATION_FOR_ENTERPRISE,
    'CODE_SECURITY_CREATE_CONFIGURATION_FOR_ENTERPRISE',
    initialBehavior,
    _meta,
  );
}
