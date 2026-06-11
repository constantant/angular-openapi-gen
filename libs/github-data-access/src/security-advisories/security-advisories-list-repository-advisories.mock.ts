import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { SECURITY_ADVISORIES_LIST_REPOSITORY_ADVISORIES } from './security-advisories-list-repository-advisories.token';
import type { SecurityAdvisoriesListRepositoryAdvisoriesResponse } from './security-advisories-list-repository-advisories.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'security-advisories/list-repository-advisories',
  path: '/repos/{owner}/{repo}/security-advisories',
  method: 'get',
  tag: 'security-advisories',
};

export function provideSecurityAdvisoriesListRepositoryAdvisoriesMock(
  initialBehavior?: ProviderInitialBehavior<SecurityAdvisoriesListRepositoryAdvisoriesResponse>,
): FactoryProvider {
  return provideMockResource(
    SECURITY_ADVISORIES_LIST_REPOSITORY_ADVISORIES,
    'SECURITY_ADVISORIES_LIST_REPOSITORY_ADVISORIES',
    initialBehavior,
    _meta,
  );
}
