import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_ADD_STATUS_CHECK_CONTEXTS } from './repos-add-status-check-contexts.token';
import type { ReposAddStatusCheckContextsResponse } from './repos-add-status-check-contexts.token';

export function provideReposAddStatusCheckContextsMock(
  initialBehavior?: ProviderInitialBehavior<ReposAddStatusCheckContextsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_ADD_STATUS_CHECK_CONTEXTS,
    'REPOS_ADD_STATUS_CHECK_CONTEXTS',
    initialBehavior,
  );
}
