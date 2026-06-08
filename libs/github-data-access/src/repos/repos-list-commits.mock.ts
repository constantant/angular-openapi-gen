import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_COMMITS } from './repos-list-commits.token';
import type { ReposListCommitsResponse } from './repos-list-commits.token';

export function provideReposListCommitsMock(
  initialBehavior?: ProviderInitialBehavior<ReposListCommitsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_COMMITS,
    'REPOS_LIST_COMMITS',
    initialBehavior,
  );
}
