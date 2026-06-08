import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { SECURITY_ADVISORIES_LIST_ORG_REPOSITORY_ADVISORIES } from './security-advisories-list-org-repository-advisories.token';
import type { SecurityAdvisoriesListOrgRepositoryAdvisoriesResponse } from './security-advisories-list-org-repository-advisories.token';

export function provideSecurityAdvisoriesListOrgRepositoryAdvisoriesMock(
  initialBehavior?: ProviderInitialBehavior<SecurityAdvisoriesListOrgRepositoryAdvisoriesResponse>,
): FactoryProvider {
  return provideMockResource(
    SECURITY_ADVISORIES_LIST_ORG_REPOSITORY_ADVISORIES,
    'SECURITY_ADVISORIES_LIST_ORG_REPOSITORY_ADVISORIES',
    initialBehavior,
  );
}
