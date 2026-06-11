import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { SECURITY_ADVISORIES_LIST_ORG_REPOSITORY_ADVISORIES } from './security-advisories-list-org-repository-advisories.token';
import type { SecurityAdvisoriesListOrgRepositoryAdvisoriesResponse } from './security-advisories-list-org-repository-advisories.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'security-advisories/list-org-repository-advisories',
  path: '/orgs/{org}/security-advisories',
  method: 'get',
  tag: 'security-advisories',
};

export function provideSecurityAdvisoriesListOrgRepositoryAdvisoriesMock(
  initialBehavior?: ProviderInitialBehavior<SecurityAdvisoriesListOrgRepositoryAdvisoriesResponse>,
): FactoryProvider {
  return provideMockResource(
    SECURITY_ADVISORIES_LIST_ORG_REPOSITORY_ADVISORIES,
    'SECURITY_ADVISORIES_LIST_ORG_REPOSITORY_ADVISORIES',
    initialBehavior,
    _meta,
  );
}
