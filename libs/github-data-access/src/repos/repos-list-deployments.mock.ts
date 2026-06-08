import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_DEPLOYMENTS } from './repos-list-deployments.token';
import type { ReposListDeploymentsResponse } from './repos-list-deployments.token';

export function provideReposListDeploymentsMock(
  initialBehavior?: ProviderInitialBehavior<ReposListDeploymentsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_DEPLOYMENTS,
    'REPOS_LIST_DEPLOYMENTS',
    initialBehavior,
  );
}
