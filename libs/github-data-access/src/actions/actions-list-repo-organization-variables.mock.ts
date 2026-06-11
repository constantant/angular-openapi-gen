import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_REPO_ORGANIZATION_VARIABLES } from './actions-list-repo-organization-variables.token';
import type { ActionsListRepoOrganizationVariablesResponse } from './actions-list-repo-organization-variables.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/list-repo-organization-variables',
  path: '/repos/{owner}/{repo}/actions/organization-variables',
  method: 'get',
  tag: 'actions',
};

export function provideActionsListRepoOrganizationVariablesMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListRepoOrganizationVariablesResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_REPO_ORGANIZATION_VARIABLES,
    'ACTIONS_LIST_REPO_ORGANIZATION_VARIABLES',
    initialBehavior,
    _meta,
  );
}
