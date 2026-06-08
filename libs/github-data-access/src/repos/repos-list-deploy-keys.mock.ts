import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_DEPLOY_KEYS } from './repos-list-deploy-keys.token';
import type { ReposListDeployKeysResponse } from './repos-list-deploy-keys.token';

export function provideReposListDeployKeysMock(
  initialBehavior?: ProviderInitialBehavior<ReposListDeployKeysResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_DEPLOY_KEYS,
    'REPOS_LIST_DEPLOY_KEYS',
    initialBehavior,
  );
}
