import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_ENVIRONMENT } from './repos-get-environment.token';
import type { ReposGetEnvironmentResponse } from './repos-get-environment.token';

export function provideReposGetEnvironmentMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetEnvironmentResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_ENVIRONMENT,
    'REPOS_GET_ENVIRONMENT',
    initialBehavior,
  );
}
