import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_REMOVE_REPOSITORY_FOR_SECRET_FOR_AUTHENTICATED_USER } from './codespaces-remove-repository-for-secret-for-authenticated-user.token';

export function provideCodespacesRemoveRepositoryForSecretForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_REMOVE_REPOSITORY_FOR_SECRET_FOR_AUTHENTICATED_USER,
    'CODESPACES_REMOVE_REPOSITORY_FOR_SECRET_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
