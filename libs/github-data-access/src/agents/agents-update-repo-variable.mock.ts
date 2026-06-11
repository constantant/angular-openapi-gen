import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { AGENTS_UPDATE_REPO_VARIABLE } from './agents-update-repo-variable.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'agents/update-repo-variable',
  path: '/repos/{owner}/{repo}/agents/variables/{name}',
  method: 'patch',
  tag: 'agents',
};

export function provideAgentsUpdateRepoVariableMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_UPDATE_REPO_VARIABLE,
    'AGENTS_UPDATE_REPO_VARIABLE',
    initialBehavior,
    _meta,
  );
}
