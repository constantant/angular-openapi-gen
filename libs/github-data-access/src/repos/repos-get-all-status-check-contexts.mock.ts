import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_ALL_STATUS_CHECK_CONTEXTS } from './repos-get-all-status-check-contexts.token';
import type { ReposGetAllStatusCheckContextsResponse } from './repos-get-all-status-check-contexts.token';

export function provideReposGetAllStatusCheckContextsMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetAllStatusCheckContextsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_ALL_STATUS_CHECK_CONTEXTS,
    'REPOS_GET_ALL_STATUS_CHECK_CONTEXTS',
    initialBehavior,
  );
}
