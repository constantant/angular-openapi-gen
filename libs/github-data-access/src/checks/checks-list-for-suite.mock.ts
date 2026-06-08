import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CHECKS_LIST_FOR_SUITE } from './checks-list-for-suite.token';
import type { ChecksListForSuiteResponse } from './checks-list-for-suite.token';

export function provideChecksListForSuiteMock(
  initialBehavior?: ProviderInitialBehavior<ChecksListForSuiteResponse>,
): FactoryProvider {
  return provideMockResource(
    CHECKS_LIST_FOR_SUITE,
    'CHECKS_LIST_FOR_SUITE',
    initialBehavior,
  );
}
