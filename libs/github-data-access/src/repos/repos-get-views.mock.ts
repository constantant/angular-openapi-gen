import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_VIEWS } from './repos-get-views.token';
import type { ReposGetViewsResponse } from './repos-get-views.token';

export function provideReposGetViewsMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetViewsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_VIEWS,
    'REPOS_GET_VIEWS',
    initialBehavior,
  );
}
