import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_DEPLOY_KEY } from './repos-get-deploy-key.token';
import type { ReposGetDeployKeyResponse } from './repos-get-deploy-key.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-deploy-key',
  path: '/repos/{owner}/{repo}/keys/{key_id}',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetDeployKeyMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetDeployKeyResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_DEPLOY_KEY,
    'REPOS_GET_DEPLOY_KEY',
    initialBehavior,
    _meta,
    options,
  );
}
