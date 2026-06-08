import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_PAGES } from './repos-get-pages.token';
import type { ReposGetPagesResponse } from './repos-get-pages.token';

export function provideReposGetPagesMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetPagesResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_PAGES,
    'REPOS_GET_PAGES',
    initialBehavior,
  );
}
