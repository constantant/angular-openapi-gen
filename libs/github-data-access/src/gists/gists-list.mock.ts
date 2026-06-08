import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { GISTS_LIST } from './gists-list.token';
import type { GistsListResponse } from './gists-list.token';

export function provideGistsListMock(
  initialBehavior?: ProviderInitialBehavior<GistsListResponse>,
): FactoryProvider {
  return provideMockResource(GISTS_LIST, 'GISTS_LIST', initialBehavior);
}
