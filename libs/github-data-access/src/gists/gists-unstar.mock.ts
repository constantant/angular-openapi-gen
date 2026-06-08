import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { GISTS_UNSTAR } from './gists-unstar.token';

export function provideGistsUnstarMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(GISTS_UNSTAR, 'GISTS_UNSTAR', initialBehavior);
}
