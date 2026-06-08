import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { GISTS_CREATE } from './gists-create.token';
import type { GistsCreateResponse } from './gists-create.token';

export function provideGistsCreateMock(
  initialBehavior?: ProviderInitialBehavior<GistsCreateResponse>,
): FactoryProvider {
  return provideMockResource(GISTS_CREATE, 'GISTS_CREATE', initialBehavior);
}
