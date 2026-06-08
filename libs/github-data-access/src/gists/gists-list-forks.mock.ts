import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { GISTS_LIST_FORKS } from './gists-list-forks.token';
import type { GistsListForksResponse } from './gists-list-forks.token';

export function provideGistsListForksMock(
  initialBehavior?: ProviderInitialBehavior<GistsListForksResponse>,
): FactoryProvider {
  return provideMockResource(
    GISTS_LIST_FORKS,
    'GISTS_LIST_FORKS',
    initialBehavior,
  );
}
