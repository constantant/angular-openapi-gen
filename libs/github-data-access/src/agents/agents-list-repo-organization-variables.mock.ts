import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { AGENTS_LIST_REPO_ORGANIZATION_VARIABLES } from './agents-list-repo-organization-variables.token';
import type { AgentsListRepoOrganizationVariablesResponse } from './agents-list-repo-organization-variables.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'agents/list-repo-organization-variables',
  path: '/repos/{owner}/{repo}/agents/organization-variables',
  method: 'get',
  tag: 'agents',
};

export function provideAgentsListRepoOrganizationVariablesMock(
  initialBehavior?: ProviderInitialBehavior<AgentsListRepoOrganizationVariablesResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_LIST_REPO_ORGANIZATION_VARIABLES,
    'AGENTS_LIST_REPO_ORGANIZATION_VARIABLES',
    initialBehavior,
    _meta,
  );
}
