import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { GISTS_UPDATE } from './gists-update.token';
import type { GistsUpdateResponse } from './gists-update.token';

export function provideGistsUpdateMock(
  initialBehavior?: ProviderInitialBehavior<GistsUpdateResponse>,
): FactoryProvider {
  return provideMockResource(GISTS_UPDATE, 'GISTS_UPDATE', initialBehavior);
}
