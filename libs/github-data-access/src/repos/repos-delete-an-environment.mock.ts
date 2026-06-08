import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_AN_ENVIRONMENT } from './repos-delete-an-environment.token';

export function provideReposDeleteAnEnvironmentMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_AN_ENVIRONMENT,
    'REPOS_DELETE_AN_ENVIRONMENT',
    initialBehavior,
  );
}
