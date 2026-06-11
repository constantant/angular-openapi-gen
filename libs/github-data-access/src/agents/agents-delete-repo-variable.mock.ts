import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { AGENTS_DELETE_REPO_VARIABLE } from './agents-delete-repo-variable.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'agents/delete-repo-variable',
  path: '/repos/{owner}/{repo}/agents/variables/{name}',
  method: 'delete',
  tag: 'agents',
};

export function provideAgentsDeleteRepoVariableMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_DELETE_REPO_VARIABLE,
    'AGENTS_DELETE_REPO_VARIABLE',
    initialBehavior,
    _meta,
  );
}
