import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_RELEASE } from './repos-get-release.token';
import type { ReposGetReleaseResponse } from './repos-get-release.token';

export function provideReposGetReleaseMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetReleaseResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_RELEASE,
    'REPOS_GET_RELEASE',
    initialBehavior,
  );
}
