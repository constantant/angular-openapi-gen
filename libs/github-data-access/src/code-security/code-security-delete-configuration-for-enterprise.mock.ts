import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SECURITY_DELETE_CONFIGURATION_FOR_ENTERPRISE } from './code-security-delete-configuration-for-enterprise.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-security/delete-configuration-for-enterprise',
  path: '/enterprises/{enterprise}/code-security/configurations/{configuration_id}',
  method: 'delete',
  tag: 'code-security',
};

export function provideCodeSecurityDeleteConfigurationForEnterpriseMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    CODE_SECURITY_DELETE_CONFIGURATION_FOR_ENTERPRISE,
    'CODE_SECURITY_DELETE_CONFIGURATION_FOR_ENTERPRISE',
    initialBehavior,
    _meta,
  );
}
