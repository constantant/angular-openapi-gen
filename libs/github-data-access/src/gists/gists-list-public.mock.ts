import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { GISTS_LIST_PUBLIC } from './gists-list-public.token';
import type { GistsListPublicResponse } from './gists-list-public.token';

export function provideGistsListPublicMock(
  initialBehavior?: ProviderInitialBehavior<GistsListPublicResponse>,
): FactoryProvider {
  return provideMockResource(
    GISTS_LIST_PUBLIC,
    'GISTS_LIST_PUBLIC',
    initialBehavior,
  );
}
