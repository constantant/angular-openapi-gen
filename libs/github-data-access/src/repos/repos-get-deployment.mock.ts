import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_DEPLOYMENT } from './repos-get-deployment.token';
import type { ReposGetDeploymentResponse } from './repos-get-deployment.token';

export function provideReposGetDeploymentMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetDeploymentResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_DEPLOYMENT,
    'REPOS_GET_DEPLOYMENT',
    initialBehavior,
  );
}
