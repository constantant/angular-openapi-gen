import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_RELEASES } from './repos-list-releases.token';
import type { ReposListReleasesResponse } from './repos-list-releases.token';

export function provideReposListReleasesMock(
  initialBehavior?: ProviderInitialBehavior<ReposListReleasesResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_RELEASES,
    'REPOS_LIST_RELEASES',
    initialBehavior,
  );
}
