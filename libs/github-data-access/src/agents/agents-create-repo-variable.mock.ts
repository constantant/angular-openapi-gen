import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { AGENTS_CREATE_REPO_VARIABLE } from './agents-create-repo-variable.token';
import type { AgentsCreateRepoVariableResponse } from './agents-create-repo-variable.token';

export function provideAgentsCreateRepoVariableMock(
  initialBehavior?: ProviderInitialBehavior<AgentsCreateRepoVariableResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_CREATE_REPO_VARIABLE,
    'AGENTS_CREATE_REPO_VARIABLE',
    initialBehavior,
  );
}
