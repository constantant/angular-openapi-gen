import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_DEPLOYMENT } from './repos-delete-deployment.token';

export function provideReposDeleteDeploymentMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_DEPLOYMENT,
    'REPOS_DELETE_DEPLOYMENT',
    initialBehavior,
  );
}
