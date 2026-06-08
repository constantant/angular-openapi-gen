import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { SECURITY_ADVISORIES_CREATE_FORK } from './security-advisories-create-fork.token';
import type { SecurityAdvisoriesCreateForkResponse } from './security-advisories-create-fork.token';

export function provideSecurityAdvisoriesCreateForkMock(
  initialBehavior?: ProviderInitialBehavior<SecurityAdvisoriesCreateForkResponse>,
): FactoryProvider {
  return provideMockResource(
    SECURITY_ADVISORIES_CREATE_FORK,
    'SECURITY_ADVISORIES_CREATE_FORK',
    initialBehavior,
  );
}
