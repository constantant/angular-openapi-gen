import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_PAGES_DEPLOYMENT } from './repos-get-pages-deployment.token';
import type { ReposGetPagesDeploymentResponse } from './repos-get-pages-deployment.token';

export function provideReposGetPagesDeploymentMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetPagesDeploymentResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_PAGES_DEPLOYMENT,
    'REPOS_GET_PAGES_DEPLOYMENT',
    initialBehavior,
  );
}
