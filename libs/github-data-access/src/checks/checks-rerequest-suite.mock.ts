import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CHECKS_REREQUEST_SUITE } from './checks-rerequest-suite.token';
import type { ChecksRerequestSuiteResponse } from './checks-rerequest-suite.token';

export function provideChecksRerequestSuiteMock(
  initialBehavior?: ProviderInitialBehavior<ChecksRerequestSuiteResponse>,
): FactoryProvider {
  return provideMockResource(
    CHECKS_REREQUEST_SUITE,
    'CHECKS_REREQUEST_SUITE',
    initialBehavior,
  );
}
