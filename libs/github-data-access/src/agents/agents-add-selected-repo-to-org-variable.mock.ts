import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { AGENTS_ADD_SELECTED_REPO_TO_ORG_VARIABLE } from './agents-add-selected-repo-to-org-variable.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'agents/add-selected-repo-to-org-variable',
  path: '/orgs/{org}/agents/variables/{name}/repositories/{repository_id}',
  method: 'put',
  tag: 'agents',
};

export function provideAgentsAddSelectedRepoToOrgVariableMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_ADD_SELECTED_REPO_TO_ORG_VARIABLE,
    'AGENTS_ADD_SELECTED_REPO_TO_ORG_VARIABLE',
    initialBehavior,
    _meta,
  );
}
