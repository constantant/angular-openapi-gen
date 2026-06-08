import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_REQUEST_PAGES_BUILD } from './repos-request-pages-build.token';
import type { ReposRequestPagesBuildResponse } from './repos-request-pages-build.token';

export function provideReposRequestPagesBuildMock(
  initialBehavior?: ProviderInitialBehavior<ReposRequestPagesBuildResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_REQUEST_PAGES_BUILD,
    'REPOS_REQUEST_PAGES_BUILD',
    initialBehavior,
  );
}
