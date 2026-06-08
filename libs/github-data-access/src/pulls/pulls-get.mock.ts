import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PULLS_GET } from './pulls-get.token';
import type { PullsGetResponse } from './pulls-get.token';

export function providePullsGetMock(
  initialBehavior?: ProviderInitialBehavior<PullsGetResponse>,
): FactoryProvider {
  return provideMockResource(PULLS_GET, 'PULLS_GET', initialBehavior);
}
