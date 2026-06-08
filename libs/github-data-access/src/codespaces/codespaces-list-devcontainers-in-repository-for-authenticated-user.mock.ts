import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_LIST_DEVCONTAINERS_IN_REPOSITORY_FOR_AUTHENTICATED_USER } from './codespaces-list-devcontainers-in-repository-for-authenticated-user.token';
import type { CodespacesListDevcontainersInRepositoryForAuthenticatedUserResponse } from './codespaces-list-devcontainers-in-repository-for-authenticated-user.token';

export function provideCodespacesListDevcontainersInRepositoryForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesListDevcontainersInRepositoryForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_LIST_DEVCONTAINERS_IN_REPOSITORY_FOR_AUTHENTICATED_USER,
    'CODESPACES_LIST_DEVCONTAINERS_IN_REPOSITORY_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
