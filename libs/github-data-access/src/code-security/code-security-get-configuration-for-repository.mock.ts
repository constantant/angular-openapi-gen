import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SECURITY_GET_CONFIGURATION_FOR_REPOSITORY } from './code-security-get-configuration-for-repository.token';
import type { CodeSecurityGetConfigurationForRepositoryResponse } from './code-security-get-configuration-for-repository.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-security/get-configuration-for-repository',
  path: '/repos/{owner}/{repo}/code-security-configuration',
  method: 'get',
  tag: 'code-security',
};

export function provideCodeSecurityGetConfigurationForRepositoryMock(
  initialBehavior?: ProviderInitialBehavior<CodeSecurityGetConfigurationForRepositoryResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SECURITY_GET_CONFIGURATION_FOR_REPOSITORY,
    'CODE_SECURITY_GET_CONFIGURATION_FOR_REPOSITORY',
    initialBehavior,
    _meta,
  );
}
