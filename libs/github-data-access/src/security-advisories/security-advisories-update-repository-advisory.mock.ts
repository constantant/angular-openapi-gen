import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { SECURITY_ADVISORIES_UPDATE_REPOSITORY_ADVISORY } from './security-advisories-update-repository-advisory.token';
import type { SecurityAdvisoriesUpdateRepositoryAdvisoryResponse } from './security-advisories-update-repository-advisory.token';

export function provideSecurityAdvisoriesUpdateRepositoryAdvisoryMock(
  initialBehavior?: ProviderInitialBehavior<SecurityAdvisoriesUpdateRepositoryAdvisoryResponse>,
): FactoryProvider {
  return provideMockResource(
    SECURITY_ADVISORIES_UPDATE_REPOSITORY_ADVISORY,
    'SECURITY_ADVISORIES_UPDATE_REPOSITORY_ADVISORY',
    initialBehavior,
  );
}
