import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_DEPLOYMENT_STATUS } from './repos-get-deployment-status.token';
import type { ReposGetDeploymentStatusResponse } from './repos-get-deployment-status.token';

export function provideReposGetDeploymentStatusMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetDeploymentStatusResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_DEPLOYMENT_STATUS,
    'REPOS_GET_DEPLOYMENT_STATUS',
    initialBehavior,
  );
}
