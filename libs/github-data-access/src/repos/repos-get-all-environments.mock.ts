import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_ALL_ENVIRONMENTS } from './repos-get-all-environments.token';
import type { ReposGetAllEnvironmentsResponse } from './repos-get-all-environments.token';

export function provideReposGetAllEnvironmentsMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetAllEnvironmentsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_ALL_ENVIRONMENTS,
    'REPOS_GET_ALL_ENVIRONMENTS',
    initialBehavior,
  );
}
