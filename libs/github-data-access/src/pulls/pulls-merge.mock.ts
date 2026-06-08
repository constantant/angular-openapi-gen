import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PULLS_MERGE } from './pulls-merge.token';
import type { PullsMergeResponse } from './pulls-merge.token';

export function providePullsMergeMock(
  initialBehavior?: ProviderInitialBehavior<PullsMergeResponse>,
): FactoryProvider {
  return provideMockResource(PULLS_MERGE, 'PULLS_MERGE', initialBehavior);
}
