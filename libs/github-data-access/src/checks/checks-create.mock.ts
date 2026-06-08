import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CHECKS_CREATE } from './checks-create.token';
import type { ChecksCreateResponse } from './checks-create.token';

export function provideChecksCreateMock(
  initialBehavior?: ProviderInitialBehavior<ChecksCreateResponse>,
): FactoryProvider {
  return provideMockResource(CHECKS_CREATE, 'CHECKS_CREATE', initialBehavior);
}
