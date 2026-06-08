import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_RELEASE_BY_TAG } from './repos-get-release-by-tag.token';
import type { ReposGetReleaseByTagResponse } from './repos-get-release-by-tag.token';

export function provideReposGetReleaseByTagMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetReleaseByTagResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_RELEASE_BY_TAG,
    'REPOS_GET_RELEASE_BY_TAG',
    initialBehavior,
  );
}
