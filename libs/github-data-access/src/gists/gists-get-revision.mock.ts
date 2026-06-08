import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { GISTS_GET_REVISION } from './gists-get-revision.token';
import type { GistsGetRevisionResponse } from './gists-get-revision.token';

export function provideGistsGetRevisionMock(
  initialBehavior?: ProviderInitialBehavior<GistsGetRevisionResponse>,
): FactoryProvider {
  return provideMockResource(
    GISTS_GET_REVISION,
    'GISTS_GET_REVISION',
    initialBehavior,
  );
}
