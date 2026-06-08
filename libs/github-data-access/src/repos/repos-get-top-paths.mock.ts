import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_TOP_PATHS } from './repos-get-top-paths.token';
import type { ReposGetTopPathsResponse } from './repos-get-top-paths.token';

export function provideReposGetTopPathsMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetTopPathsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_TOP_PATHS,
    'REPOS_GET_TOP_PATHS',
    initialBehavior,
  );
}
