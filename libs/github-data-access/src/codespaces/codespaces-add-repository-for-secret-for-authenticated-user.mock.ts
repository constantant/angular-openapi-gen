import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_ADD_REPOSITORY_FOR_SECRET_FOR_AUTHENTICATED_USER } from './codespaces-add-repository-for-secret-for-authenticated-user.token';

export function provideCodespacesAddRepositoryForSecretForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_ADD_REPOSITORY_FOR_SECRET_FOR_AUTHENTICATED_USER,
    'CODESPACES_ADD_REPOSITORY_FOR_SECRET_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
