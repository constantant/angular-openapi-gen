import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CHECKS_CREATE_SUITE } from './checks-create-suite.token';
import type { ChecksCreateSuiteResponse } from './checks-create-suite.token';

export function provideChecksCreateSuiteMock(
  initialBehavior?: ProviderInitialBehavior<ChecksCreateSuiteResponse>,
): FactoryProvider {
  return provideMockResource(
    CHECKS_CREATE_SUITE,
    'CHECKS_CREATE_SUITE',
    initialBehavior,
  );
}
