import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_REMOVE_SELECTED_REPO_FROM_ORG_VARIABLE } from './actions-remove-selected-repo-from-org-variable.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/remove-selected-repo-from-org-variable',
  path: '/orgs/{org}/actions/variables/{name}/repositories/{repository_id}',
  method: 'delete',
  tag: 'actions',
};

export function provideActionsRemoveSelectedRepoFromOrgVariableMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_REMOVE_SELECTED_REPO_FROM_ORG_VARIABLE,
    'ACTIONS_REMOVE_SELECTED_REPO_FROM_ORG_VARIABLE',
    initialBehavior,
    _meta,
  );
}
