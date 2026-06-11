import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_AN_ENVIRONMENT } from './repos-delete-an-environment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/delete-an-environment',
  path: '/repos/{owner}/{repo}/environments/{environment_name}',
  method: 'delete',
  tag: 'repos',
};

export function provideReposDeleteAnEnvironmentMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_AN_ENVIRONMENT,
    'REPOS_DELETE_AN_ENVIRONMENT',
    initialBehavior,
    _meta,
  );
}
