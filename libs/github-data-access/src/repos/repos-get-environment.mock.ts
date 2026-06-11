import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_ENVIRONMENT } from './repos-get-environment.token';
import type { ReposGetEnvironmentResponse } from './repos-get-environment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-environment',
  path: '/repos/{owner}/{repo}/environments/{environment_name}',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetEnvironmentMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetEnvironmentResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_ENVIRONMENT,
    'REPOS_GET_ENVIRONMENT',
    initialBehavior,
    _meta,
  );
}
