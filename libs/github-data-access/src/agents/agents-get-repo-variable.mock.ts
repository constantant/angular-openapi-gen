import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { AGENTS_GET_REPO_VARIABLE } from './agents-get-repo-variable.token';
import type { AgentsGetRepoVariableResponse } from './agents-get-repo-variable.token';

export function provideAgentsGetRepoVariableMock(
  initialBehavior?: ProviderInitialBehavior<AgentsGetRepoVariableResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_GET_REPO_VARIABLE,
    'AGENTS_GET_REPO_VARIABLE',
    initialBehavior,
  );
}
