import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { AGENTS_LIST_SELECTED_REPOS_FOR_ORG_VARIABLE } from './agents-list-selected-repos-for-org-variable.token';
import type { AgentsListSelectedReposForOrgVariableResponse } from './agents-list-selected-repos-for-org-variable.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'agents/list-selected-repos-for-org-variable',
  path: '/orgs/{org}/agents/variables/{name}/repositories',
  method: 'get',
  tag: 'agents',
};

export function provideAgentsListSelectedReposForOrgVariableMock(
  initialBehavior?: ProviderInitialBehavior<AgentsListSelectedReposForOrgVariableResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_LIST_SELECTED_REPOS_FOR_ORG_VARIABLE,
    'AGENTS_LIST_SELECTED_REPOS_FOR_ORG_VARIABLE',
    initialBehavior,
    _meta,
  );
}
