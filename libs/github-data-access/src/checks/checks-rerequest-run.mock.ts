import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CHECKS_REREQUEST_RUN } from './checks-rerequest-run.token';
import type { ChecksRerequestRunResponse } from './checks-rerequest-run.token';

export function provideChecksRerequestRunMock(
  initialBehavior?: ProviderInitialBehavior<ChecksRerequestRunResponse>,
): FactoryProvider {
  return provideMockResource(
    CHECKS_REREQUEST_RUN,
    'CHECKS_REREQUEST_RUN',
    initialBehavior,
  );
}
