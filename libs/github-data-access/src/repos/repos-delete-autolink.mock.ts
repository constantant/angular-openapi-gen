import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_AUTOLINK } from './repos-delete-autolink.token';

export function provideReposDeleteAutolinkMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_AUTOLINK,
    'REPOS_DELETE_AUTOLINK',
    initialBehavior,
  );
}
