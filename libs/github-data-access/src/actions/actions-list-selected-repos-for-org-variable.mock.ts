import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_SELECTED_REPOS_FOR_ORG_VARIABLE } from './actions-list-selected-repos-for-org-variable.token';
import type { ActionsListSelectedReposForOrgVariableResponse } from './actions-list-selected-repos-for-org-variable.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/list-selected-repos-for-org-variable',
  path: '/orgs/{org}/actions/variables/{name}/repositories',
  method: 'get',
  tag: 'actions',
};

export function provideActionsListSelectedReposForOrgVariableMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListSelectedReposForOrgVariableResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_SELECTED_REPOS_FOR_ORG_VARIABLE,
    'ACTIONS_LIST_SELECTED_REPOS_FOR_ORG_VARIABLE',
    initialBehavior,
    _meta,
  );
}
