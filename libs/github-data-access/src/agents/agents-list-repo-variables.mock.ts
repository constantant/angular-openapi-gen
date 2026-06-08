import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { AGENTS_LIST_REPO_VARIABLES } from './agents-list-repo-variables.token';
import type { AgentsListRepoVariablesResponse } from './agents-list-repo-variables.token';

export function provideAgentsListRepoVariablesMock(
  initialBehavior?: ProviderInitialBehavior<AgentsListRepoVariablesResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_LIST_REPO_VARIABLES,
    'AGENTS_LIST_REPO_VARIABLES',
    initialBehavior,
  );
}
