import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_DEPLOY_KEY } from './repos-delete-deploy-key.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/delete-deploy-key',
  path: '/repos/{owner}/{repo}/keys/{key_id}',
  method: 'delete',
  tag: 'repos',
};

export function provideReposDeleteDeployKeyMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_DEPLOY_KEY,
    'REPOS_DELETE_DEPLOY_KEY',
    initialBehavior,
    _meta,
  );
}
