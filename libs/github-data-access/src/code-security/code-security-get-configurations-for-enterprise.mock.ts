import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SECURITY_GET_CONFIGURATIONS_FOR_ENTERPRISE } from './code-security-get-configurations-for-enterprise.token';
import type { CodeSecurityGetConfigurationsForEnterpriseResponse } from './code-security-get-configurations-for-enterprise.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-security/get-configurations-for-enterprise',
  path: '/enterprises/{enterprise}/code-security/configurations',
  method: 'get',
  tag: 'code-security',
};

export function provideCodeSecurityGetConfigurationsForEnterpriseMock(
  initialBehavior?: ProviderInitialBehavior<CodeSecurityGetConfigurationsForEnterpriseResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SECURITY_GET_CONFIGURATIONS_FOR_ENTERPRISE,
    'CODE_SECURITY_GET_CONFIGURATIONS_FOR_ENTERPRISE',
    initialBehavior,
    _meta,
  );
}
