import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_PAGES_BUILDS } from './repos-list-pages-builds.token';
import type { ReposListPagesBuildsResponse } from './repos-list-pages-builds.token';

export function provideReposListPagesBuildsMock(
  initialBehavior?: ProviderInitialBehavior<ReposListPagesBuildsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_PAGES_BUILDS,
    'REPOS_LIST_PAGES_BUILDS',
    initialBehavior,
  );
}
