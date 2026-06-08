import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_COMPARE_COMMITS } from './repos-compare-commits.token';
import type { ReposCompareCommitsResponse } from './repos-compare-commits.token';

export function provideReposCompareCommitsMock(
  initialBehavior?: ProviderInitialBehavior<ReposCompareCommitsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_COMPARE_COMMITS,
    'REPOS_COMPARE_COMMITS',
    initialBehavior,
  );
}
