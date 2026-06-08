import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_DEPLOYMENT_STATUSES } from './repos-list-deployment-statuses.token';
import type { ReposListDeploymentStatusesResponse } from './repos-list-deployment-statuses.token';

export function provideReposListDeploymentStatusesMock(
  initialBehavior?: ProviderInitialBehavior<ReposListDeploymentStatusesResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_DEPLOYMENT_STATUSES,
    'REPOS_LIST_DEPLOYMENT_STATUSES',
    initialBehavior,
  );
}
