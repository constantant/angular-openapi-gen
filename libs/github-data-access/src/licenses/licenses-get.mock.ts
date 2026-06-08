import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { LICENSES_GET } from './licenses-get.token';
import type { LicensesGetResponse } from './licenses-get.token';

export function provideLicensesGetMock(
  initialBehavior?: ProviderInitialBehavior<LicensesGetResponse>,
): FactoryProvider {
  return provideMockResource(LICENSES_GET, 'LICENSES_GET', initialBehavior);
}
