import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PULLS_CREATE } from './pulls-create.token';
import type { PullsCreateResponse } from './pulls-create.token';

export function providePullsCreateMock(
  initialBehavior?: ProviderInitialBehavior<PullsCreateResponse>,
): FactoryProvider {
  return provideMockResource(PULLS_CREATE, 'PULLS_CREATE', initialBehavior);
}
