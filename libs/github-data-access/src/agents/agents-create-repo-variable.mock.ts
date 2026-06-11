import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { AGENTS_CREATE_REPO_VARIABLE } from './agents-create-repo-variable.token';
import type { AgentsCreateRepoVariableResponse } from './agents-create-repo-variable.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'agents/create-repo-variable',
  path: '/repos/{owner}/{repo}/agents/variables',
  method: 'post',
  tag: 'agents',
};

export function provideAgentsCreateRepoVariableMock(
  initialBehavior?: ProviderInitialBehavior<AgentsCreateRepoVariableResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_CREATE_REPO_VARIABLE,
    'AGENTS_CREATE_REPO_VARIABLE',
    initialBehavior,
    _meta,
  );
}
