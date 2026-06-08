import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_CREATE_OR_UPDATE_SECRET_FOR_AUTHENTICATED_USER } from './codespaces-create-or-update-secret-for-authenticated-user.token';
import type { CodespacesCreateOrUpdateSecretForAuthenticatedUserResponse } from './codespaces-create-or-update-secret-for-authenticated-user.token';

export function provideCodespacesCreateOrUpdateSecretForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesCreateOrUpdateSecretForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_CREATE_OR_UPDATE_SECRET_FOR_AUTHENTICATED_USER,
    'CODESPACES_CREATE_OR_UPDATE_SECRET_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
