import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CHECKS_LIST_FOR_REF } from './checks-list-for-ref.token';
import type { ChecksListForRefResponse } from './checks-list-for-ref.token';

export function provideChecksListForRefMock(
  initialBehavior?: ProviderInitialBehavior<ChecksListForRefResponse>,
): FactoryProvider {
  return provideMockResource(
    CHECKS_LIST_FOR_REF,
    'CHECKS_LIST_FOR_REF',
    initialBehavior,
  );
}
