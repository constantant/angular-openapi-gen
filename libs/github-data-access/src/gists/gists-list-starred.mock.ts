import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { GISTS_LIST_STARRED } from './gists-list-starred.token';
import type { GistsListStarredResponse } from './gists-list-starred.token';

export function provideGistsListStarredMock(
  initialBehavior?: ProviderInitialBehavior<GistsListStarredResponse>,
): FactoryProvider {
  return provideMockResource(
    GISTS_LIST_STARRED,
    'GISTS_LIST_STARRED',
    initialBehavior,
  );
}
