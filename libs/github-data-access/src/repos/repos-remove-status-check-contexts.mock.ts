import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_REMOVE_STATUS_CHECK_CONTEXTS } from './repos-remove-status-check-contexts.token';
import type { ReposRemoveStatusCheckContextsResponse } from './repos-remove-status-check-contexts.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/remove-status-check-contexts',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts',
  method: 'delete',
  tag: 'repos',
};

export function provideReposRemoveStatusCheckContextsMock(
  initialBehavior?: ProviderInitialBehavior<ReposRemoveStatusCheckContextsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_REMOVE_STATUS_CHECK_CONTEXTS,
    'REPOS_REMOVE_STATUS_CHECK_CONTEXTS',
    initialBehavior,
    _meta,
  );
}
