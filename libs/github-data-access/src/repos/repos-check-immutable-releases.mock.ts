import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_CHECK_IMMUTABLE_RELEASES } from './repos-check-immutable-releases.token';
import type { ReposCheckImmutableReleasesResponse } from './repos-check-immutable-releases.token';

export function provideReposCheckImmutableReleasesMock(
  initialBehavior?: ProviderInitialBehavior<ReposCheckImmutableReleasesResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CHECK_IMMUTABLE_RELEASES,
    'REPOS_CHECK_IMMUTABLE_RELEASES',
    initialBehavior,
  );
}
