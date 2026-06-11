import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { AGENTS_LIST_REPO_VARIABLES } from './agents-list-repo-variables.token';
import type { AgentsListRepoVariablesResponse } from './agents-list-repo-variables.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'agents/list-repo-variables',
  path: '/repos/{owner}/{repo}/agents/variables',
  method: 'get',
  tag: 'agents',
};

export function provideAgentsListRepoVariablesMock(
  initialBehavior?: ProviderInitialBehavior<AgentsListRepoVariablesResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_LIST_REPO_VARIABLES,
    'AGENTS_LIST_REPO_VARIABLES',
    initialBehavior,
    _meta,
  );
}
