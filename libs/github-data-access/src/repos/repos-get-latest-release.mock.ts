import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_LATEST_RELEASE } from './repos-get-latest-release.token';
import type { ReposGetLatestReleaseResponse } from './repos-get-latest-release.token';

export function provideReposGetLatestReleaseMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetLatestReleaseResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_LATEST_RELEASE,
    'REPOS_GET_LATEST_RELEASE',
    initialBehavior,
  );
}
