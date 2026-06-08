import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PULLS_UPDATE } from './pulls-update.token';
import type { PullsUpdateResponse } from './pulls-update.token';

export function providePullsUpdateMock(
  initialBehavior?: ProviderInitialBehavior<PullsUpdateResponse>,
): FactoryProvider {
  return provideMockResource(PULLS_UPDATE, 'PULLS_UPDATE', initialBehavior);
}
