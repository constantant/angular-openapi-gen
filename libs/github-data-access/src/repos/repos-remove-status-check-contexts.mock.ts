import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_REMOVE_STATUS_CHECK_CONTEXTS } from './repos-remove-status-check-contexts.token';
import type { ReposRemoveStatusCheckContextsResponse } from './repos-remove-status-check-contexts.token';

export function provideReposRemoveStatusCheckContextsMock(
  initialBehavior?: ProviderInitialBehavior<ReposRemoveStatusCheckContextsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_REMOVE_STATUS_CHECK_CONTEXTS,
    'REPOS_REMOVE_STATUS_CHECK_CONTEXTS',
    initialBehavior,
  );
}
