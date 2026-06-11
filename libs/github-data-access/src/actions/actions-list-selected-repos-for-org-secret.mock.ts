import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_SELECTED_REPOS_FOR_ORG_SECRET } from './actions-list-selected-repos-for-org-secret.token';
import type { ActionsListSelectedReposForOrgSecretResponse } from './actions-list-selected-repos-for-org-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/list-selected-repos-for-org-secret',
  path: '/orgs/{org}/actions/secrets/{secret_name}/repositories',
  method: 'get',
  tag: 'actions',
};

export function provideActionsListSelectedReposForOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListSelectedReposForOrgSecretResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_SELECTED_REPOS_FOR_ORG_SECRET,
    'ACTIONS_LIST_SELECTED_REPOS_FOR_ORG_SECRET',
    initialBehavior,
    _meta,
  );
}
