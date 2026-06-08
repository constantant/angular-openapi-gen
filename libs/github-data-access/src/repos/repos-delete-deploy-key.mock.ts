import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_DEPLOY_KEY } from './repos-delete-deploy-key.token';

export function provideReposDeleteDeployKeyMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_DEPLOY_KEY,
    'REPOS_DELETE_DEPLOY_KEY',
    initialBehavior,
  );
}
