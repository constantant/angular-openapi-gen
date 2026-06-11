import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { SECURITY_ADVISORIES_UPDATE_REPOSITORY_ADVISORY } from './security-advisories-update-repository-advisory.token';
import type { SecurityAdvisoriesUpdateRepositoryAdvisoryResponse } from './security-advisories-update-repository-advisory.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'security-advisories/update-repository-advisory',
  path: '/repos/{owner}/{repo}/security-advisories/{ghsa_id}',
  method: 'patch',
  tag: 'security-advisories',
};

export function provideSecurityAdvisoriesUpdateRepositoryAdvisoryMock(
  initialBehavior?: ProviderInitialBehavior<SecurityAdvisoriesUpdateRepositoryAdvisoryResponse>,
): FactoryProvider {
  return provideMockResource(
    SECURITY_ADVISORIES_UPDATE_REPOSITORY_ADVISORY,
    'SECURITY_ADVISORIES_UPDATE_REPOSITORY_ADVISORY',
    initialBehavior,
    _meta,
  );
}
