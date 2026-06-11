import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_SELECTED_REPOS_FOR_ORG_SECRET } from './actions-set-selected-repos-for-org-secret.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/set-selected-repos-for-org-secret',
  path: '/orgs/{org}/actions/secrets/{secret_name}/repositories',
  method: 'put',
  tag: 'actions',
};

export function provideActionsSetSelectedReposForOrgSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_SELECTED_REPOS_FOR_ORG_SECRET,
    'ACTIONS_SET_SELECTED_REPOS_FOR_ORG_SECRET',
    initialBehavior,
    _meta,
  );
}
