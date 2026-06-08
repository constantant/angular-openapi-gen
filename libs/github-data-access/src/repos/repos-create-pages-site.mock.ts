import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_PAGES_SITE } from './repos-create-pages-site.token';
import type { ReposCreatePagesSiteResponse } from './repos-create-pages-site.token';

export function provideReposCreatePagesSiteMock(
  initialBehavior?: ProviderInitialBehavior<ReposCreatePagesSiteResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_PAGES_SITE,
    'REPOS_CREATE_PAGES_SITE',
    initialBehavior,
  );
}
