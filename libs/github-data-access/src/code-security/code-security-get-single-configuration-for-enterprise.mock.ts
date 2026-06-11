import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SECURITY_GET_SINGLE_CONFIGURATION_FOR_ENTERPRISE } from './code-security-get-single-configuration-for-enterprise.token';
import type { CodeSecurityGetSingleConfigurationForEnterpriseResponse } from './code-security-get-single-configuration-for-enterprise.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-security/get-single-configuration-for-enterprise',
  path: '/enterprises/{enterprise}/code-security/configurations/{configuration_id}',
  method: 'get',
  tag: 'code-security',
};

export function provideCodeSecurityGetSingleConfigurationForEnterpriseMock(
  initialBehavior?: ProviderInitialBehavior<CodeSecurityGetSingleConfigurationForEnterpriseResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SECURITY_GET_SINGLE_CONFIGURATION_FOR_ENTERPRISE,
    'CODE_SECURITY_GET_SINGLE_CONFIGURATION_FOR_ENTERPRISE',
    initialBehavior,
    _meta,
  );
}
