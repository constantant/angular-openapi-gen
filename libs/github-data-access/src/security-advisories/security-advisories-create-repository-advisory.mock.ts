import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { SECURITY_ADVISORIES_CREATE_REPOSITORY_ADVISORY } from './security-advisories-create-repository-advisory.token';
import type { SecurityAdvisoriesCreateRepositoryAdvisoryResponse } from './security-advisories-create-repository-advisory.token';

export function provideSecurityAdvisoriesCreateRepositoryAdvisoryMock(
  initialBehavior?: ProviderInitialBehavior<SecurityAdvisoriesCreateRepositoryAdvisoryResponse>,
): FactoryProvider {
  return provideMockResource(
    SECURITY_ADVISORIES_CREATE_REPOSITORY_ADVISORY,
    'SECURITY_ADVISORIES_CREATE_REPOSITORY_ADVISORY',
    initialBehavior,
  );
}
