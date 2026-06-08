import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { SECURITY_ADVISORIES_GET_REPOSITORY_ADVISORY } from './security-advisories-get-repository-advisory.token';
import type { SecurityAdvisoriesGetRepositoryAdvisoryResponse } from './security-advisories-get-repository-advisory.token';

export function provideSecurityAdvisoriesGetRepositoryAdvisoryMock(
  initialBehavior?: ProviderInitialBehavior<SecurityAdvisoriesGetRepositoryAdvisoryResponse>,
): FactoryProvider {
  return provideMockResource(
    SECURITY_ADVISORIES_GET_REPOSITORY_ADVISORY,
    'SECURITY_ADVISORIES_GET_REPOSITORY_ADVISORY',
    initialBehavior,
  );
}
