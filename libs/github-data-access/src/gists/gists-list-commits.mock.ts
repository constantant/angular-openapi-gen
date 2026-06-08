import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { GISTS_LIST_COMMITS } from './gists-list-commits.token';
import type { GistsListCommitsResponse } from './gists-list-commits.token';

export function provideGistsListCommitsMock(
  initialBehavior?: ProviderInitialBehavior<GistsListCommitsResponse>,
): FactoryProvider {
  return provideMockResource(
    GISTS_LIST_COMMITS,
    'GISTS_LIST_COMMITS',
    initialBehavior,
  );
}
