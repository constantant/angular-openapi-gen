import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PULLS_LIST_COMMITS } from './pulls-list-commits.token';
import type { PullsListCommitsResponse } from './pulls-list-commits.token';

export function providePullsListCommitsMock(
  initialBehavior?: ProviderInitialBehavior<PullsListCommitsResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_LIST_COMMITS,
    'PULLS_LIST_COMMITS',
    initialBehavior,
  );
}
