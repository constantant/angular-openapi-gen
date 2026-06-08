import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_SET_REPOSITORIES_FOR_SECRET_FOR_AUTHENTICATED_USER } from './codespaces-set-repositories-for-secret-for-authenticated-user.token';

export function provideCodespacesSetRepositoriesForSecretForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_SET_REPOSITORIES_FOR_SECRET_FOR_AUTHENTICATED_USER,
    'CODESPACES_SET_REPOSITORIES_FOR_SECRET_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
