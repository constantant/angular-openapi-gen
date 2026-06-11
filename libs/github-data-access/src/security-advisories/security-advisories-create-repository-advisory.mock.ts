import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { SECURITY_ADVISORIES_CREATE_REPOSITORY_ADVISORY } from './security-advisories-create-repository-advisory.token';
import type { SecurityAdvisoriesCreateRepositoryAdvisoryResponse } from './security-advisories-create-repository-advisory.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'security-advisories/create-repository-advisory',
  path: '/repos/{owner}/{repo}/security-advisories',
  method: 'post',
  tag: 'security-advisories',
};

export function provideSecurityAdvisoriesCreateRepositoryAdvisoryMock(
  initialBehavior?: ProviderInitialBehavior<SecurityAdvisoriesCreateRepositoryAdvisoryResponse>,
): FactoryProvider {
  return provideMockResource(
    SECURITY_ADVISORIES_CREATE_REPOSITORY_ADVISORY,
    'SECURITY_ADVISORIES_CREATE_REPOSITORY_ADVISORY',
    initialBehavior,
    _meta,
  );
}
