import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_PAGES_DEPLOYMENT } from './repos-create-pages-deployment.token';
import type { ReposCreatePagesDeploymentResponse } from './repos-create-pages-deployment.token';

export function provideReposCreatePagesDeploymentMock(
  initialBehavior?: ProviderInitialBehavior<ReposCreatePagesDeploymentResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_PAGES_DEPLOYMENT,
    'REPOS_CREATE_PAGES_DEPLOYMENT',
    initialBehavior,
  );
}
