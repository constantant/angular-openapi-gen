import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_RELEASE } from './repos-delete-release.token';

export function provideReposDeleteReleaseMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_RELEASE,
    'REPOS_DELETE_RELEASE',
    initialBehavior,
  );
}
