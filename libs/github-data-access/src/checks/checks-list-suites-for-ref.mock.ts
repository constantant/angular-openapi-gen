import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CHECKS_LIST_SUITES_FOR_REF } from './checks-list-suites-for-ref.token';
import type { ChecksListSuitesForRefResponse } from './checks-list-suites-for-ref.token';

export function provideChecksListSuitesForRefMock(
  initialBehavior?: ProviderInitialBehavior<ChecksListSuitesForRefResponse>,
): FactoryProvider {
  return provideMockResource(
    CHECKS_LIST_SUITES_FOR_REF,
    'CHECKS_LIST_SUITES_FOR_REF',
    initialBehavior,
  );
}
