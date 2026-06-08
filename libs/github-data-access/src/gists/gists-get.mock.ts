import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { GISTS_GET } from './gists-get.token';
import type { GistsGetResponse } from './gists-get.token';

export function provideGistsGetMock(
  initialBehavior?: ProviderInitialBehavior<GistsGetResponse>,
): FactoryProvider {
  return provideMockResource(GISTS_GET, 'GISTS_GET', initialBehavior);
}
