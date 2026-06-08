import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_MERGE } from './repos-merge.token';
import type { ReposMergeResponse } from './repos-merge.token';

export function provideReposMergeMock(
  initialBehavior?: ProviderInitialBehavior<ReposMergeResponse>,
): FactoryProvider {
  return provideMockResource(REPOS_MERGE, 'REPOS_MERGE', initialBehavior);
}
