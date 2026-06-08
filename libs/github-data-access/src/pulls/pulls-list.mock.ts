import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PULLS_LIST } from './pulls-list.token';
import type { PullsListResponse } from './pulls-list.token';

export function providePullsListMock(
  initialBehavior?: ProviderInitialBehavior<PullsListResponse>,
): FactoryProvider {
  return provideMockResource(PULLS_LIST, 'PULLS_LIST', initialBehavior);
}
