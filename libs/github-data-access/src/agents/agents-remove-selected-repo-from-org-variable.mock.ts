import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { AGENTS_REMOVE_SELECTED_REPO_FROM_ORG_VARIABLE } from './agents-remove-selected-repo-from-org-variable.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'agents/remove-selected-repo-from-org-variable',
  path: '/orgs/{org}/agents/variables/{name}/repositories/{repository_id}',
  method: 'delete',
  tag: 'agents',
};

export function provideAgentsRemoveSelectedRepoFromOrgVariableMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_REMOVE_SELECTED_REPO_FROM_ORG_VARIABLE,
    'AGENTS_REMOVE_SELECTED_REPO_FROM_ORG_VARIABLE',
    initialBehavior,
    _meta,
  );
}
