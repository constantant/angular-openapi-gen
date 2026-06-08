import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_GET } from './orgs-get.token';
import type { OrgsGetResponse } from './orgs-get.token';

export function provideOrgsGetMock(
  initialBehavior?: ProviderInitialBehavior<OrgsGetResponse>,
): FactoryProvider {
  return provideMockResource(ORGS_GET, 'ORGS_GET', initialBehavior);
}
