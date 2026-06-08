import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CHECKS_UPDATE } from './checks-update.token';
import type { ChecksUpdateResponse } from './checks-update.token';

export function provideChecksUpdateMock(
  initialBehavior?: ProviderInitialBehavior<ChecksUpdateResponse>,
): FactoryProvider {
  return provideMockResource(CHECKS_UPDATE, 'CHECKS_UPDATE', initialBehavior);
}
