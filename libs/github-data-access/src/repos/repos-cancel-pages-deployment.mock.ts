import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_CANCEL_PAGES_DEPLOYMENT } from './repos-cancel-pages-deployment.token';

export function provideReposCancelPagesDeploymentMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CANCEL_PAGES_DEPLOYMENT,
    'REPOS_CANCEL_PAGES_DEPLOYMENT',
    initialBehavior,
  );
}
