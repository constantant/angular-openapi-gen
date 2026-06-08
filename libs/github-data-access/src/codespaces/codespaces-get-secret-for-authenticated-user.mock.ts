import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_GET_SECRET_FOR_AUTHENTICATED_USER } from './codespaces-get-secret-for-authenticated-user.token';
import type { CodespacesGetSecretForAuthenticatedUserResponse } from './codespaces-get-secret-for-authenticated-user.token';

export function provideCodespacesGetSecretForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesGetSecretForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_GET_SECRET_FOR_AUTHENTICATED_USER,
    'CODESPACES_GET_SECRET_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
