import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_DEPLOY_KEYS } from './repos-list-deploy-keys.token';
import type { ReposListDeployKeysResponse } from './repos-list-deploy-keys.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-deploy-keys',
  path: '/repos/{owner}/{repo}/keys',
  method: 'get',
  tag: 'repos',
};

export function provideReposListDeployKeysMock(
  initialBehavior?: ProviderInitialBehavior<ReposListDeployKeysResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_DEPLOY_KEYS,
    'REPOS_LIST_DEPLOY_KEYS',
    initialBehavior,
    _meta,
  );
}
