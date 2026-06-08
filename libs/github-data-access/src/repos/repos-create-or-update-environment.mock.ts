import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_OR_UPDATE_ENVIRONMENT } from './repos-create-or-update-environment.token';
import type { ReposCreateOrUpdateEnvironmentResponse } from './repos-create-or-update-environment.token';

export function provideReposCreateOrUpdateEnvironmentMock(
  initialBehavior?: ProviderInitialBehavior<ReposCreateOrUpdateEnvironmentResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_OR_UPDATE_ENVIRONMENT,
    'REPOS_CREATE_OR_UPDATE_ENVIRONMENT',
    initialBehavior,
  );
}
