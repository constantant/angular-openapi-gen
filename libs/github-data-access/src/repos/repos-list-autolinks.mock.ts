import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_AUTOLINKS } from './repos-list-autolinks.token';
import type { ReposListAutolinksResponse } from './repos-list-autolinks.token';

export function provideReposListAutolinksMock(
  initialBehavior?: ProviderInitialBehavior<ReposListAutolinksResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_AUTOLINKS,
    'REPOS_LIST_AUTOLINKS',
    initialBehavior,
  );
}
