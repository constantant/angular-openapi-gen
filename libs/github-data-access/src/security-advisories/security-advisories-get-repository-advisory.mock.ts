import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { SECURITY_ADVISORIES_GET_REPOSITORY_ADVISORY } from './security-advisories-get-repository-advisory.token';
import type { SecurityAdvisoriesGetRepositoryAdvisoryResponse } from './security-advisories-get-repository-advisory.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'security-advisories/get-repository-advisory',
  path: '/repos/{owner}/{repo}/security-advisories/{ghsa_id}',
  method: 'get',
  tag: 'security-advisories',
};

export function provideSecurityAdvisoriesGetRepositoryAdvisoryMock(
  initialBehavior?: ProviderInitialBehavior<SecurityAdvisoriesGetRepositoryAdvisoryResponse>,
): FactoryProvider {
  return provideMockResource(
    SECURITY_ADVISORIES_GET_REPOSITORY_ADVISORY,
    'SECURITY_ADVISORIES_GET_REPOSITORY_ADVISORY',
    initialBehavior,
    _meta,
  );
}
