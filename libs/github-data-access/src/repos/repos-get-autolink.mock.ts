import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_AUTOLINK } from './repos-get-autolink.token';
import type { ReposGetAutolinkResponse } from './repos-get-autolink.token';

export function provideReposGetAutolinkMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetAutolinkResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_AUTOLINK,
    'REPOS_GET_AUTOLINK',
    initialBehavior,
  );
}
