import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CHECKS_GET } from './checks-get.token';
import type { ChecksGetResponse } from './checks-get.token';

export function provideChecksGetMock(
  initialBehavior?: ProviderInitialBehavior<ChecksGetResponse>,
): FactoryProvider {
  return provideMockResource(CHECKS_GET, 'CHECKS_GET', initialBehavior);
}
