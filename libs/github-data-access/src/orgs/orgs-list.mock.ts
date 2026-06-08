import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_LIST } from './orgs-list.token';
import type { OrgsListResponse } from './orgs-list.token';

export function provideOrgsListMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListResponse>,
): FactoryProvider {
  return provideMockResource(ORGS_LIST, 'ORGS_LIST', initialBehavior);
}
