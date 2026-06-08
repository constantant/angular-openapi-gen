import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { SECURITY_ADVISORIES_GET_GLOBAL_ADVISORY } from './security-advisories-get-global-advisory.token';
import type { SecurityAdvisoriesGetGlobalAdvisoryResponse } from './security-advisories-get-global-advisory.token';

export function provideSecurityAdvisoriesGetGlobalAdvisoryMock(
  initialBehavior?: ProviderInitialBehavior<SecurityAdvisoriesGetGlobalAdvisoryResponse>,
): FactoryProvider {
  return provideMockResource(
    SECURITY_ADVISORIES_GET_GLOBAL_ADVISORY,
    'SECURITY_ADVISORIES_GET_GLOBAL_ADVISORY',
    initialBehavior,
  );
}
