import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_DEPLOYMENT_STATUS } from './repos-create-deployment-status.token';
import type { ReposCreateDeploymentStatusResponse } from './repos-create-deployment-status.token';

export function provideReposCreateDeploymentStatusMock(
  initialBehavior?: ProviderInitialBehavior<ReposCreateDeploymentStatusResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_DEPLOYMENT_STATUS,
    'REPOS_CREATE_DEPLOYMENT_STATUS',
    initialBehavior,
  );
}
