import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_ADD_SELECTED_REPO_TO_ORG_VARIABLE } from './actions-add-selected-repo-to-org-variable.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/add-selected-repo-to-org-variable',
  path: '/orgs/{org}/actions/variables/{name}/repositories/{repository_id}',
  method: 'put',
  tag: 'actions',
};

export function provideActionsAddSelectedRepoToOrgVariableMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_ADD_SELECTED_REPO_TO_ORG_VARIABLE,
    'ACTIONS_ADD_SELECTED_REPO_TO_ORG_VARIABLE',
    initialBehavior,
    _meta,
  );
}
