import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CHECKS_GET_SUITE } from './checks-get-suite.token';
import type { ChecksGetSuiteResponse } from './checks-get-suite.token';

export function provideChecksGetSuiteMock(
  initialBehavior?: ProviderInitialBehavior<ChecksGetSuiteResponse>,
): FactoryProvider {
  return provideMockResource(
    CHECKS_GET_SUITE,
    'CHECKS_GET_SUITE',
    initialBehavior,
  );
}
