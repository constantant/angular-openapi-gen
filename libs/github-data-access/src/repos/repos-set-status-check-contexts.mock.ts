import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_SET_STATUS_CHECK_CONTEXTS } from './repos-set-status-check-contexts.token';
import type { ReposSetStatusCheckContextsResponse } from './repos-set-status-check-contexts.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/set-status-check-contexts',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts',
  method: 'put',
  tag: 'repos',
};

export function provideReposSetStatusCheckContextsMock(
  initialBehavior?: ProviderInitialBehavior<ReposSetStatusCheckContextsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_SET_STATUS_CHECK_CONTEXTS,
    'REPOS_SET_STATUS_CHECK_CONTEXTS',
    initialBehavior,
    _meta,
  );
}
