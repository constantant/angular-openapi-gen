import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_DEPLOY_KEY } from './repos-create-deploy-key.token';
import type { ReposCreateDeployKeyResponse } from './repos-create-deploy-key.token';

export function provideReposCreateDeployKeyMock(
  initialBehavior?: ProviderInitialBehavior<ReposCreateDeployKeyResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_DEPLOY_KEY,
    'REPOS_CREATE_DEPLOY_KEY',
    initialBehavior,
  );
}
