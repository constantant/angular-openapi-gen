import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_LIST_SECRETS_FOR_AUTHENTICATED_USER } from './codespaces-list-secrets-for-authenticated-user.token';
import type { CodespacesListSecretsForAuthenticatedUserResponse } from './codespaces-list-secrets-for-authenticated-user.token';

export function provideCodespacesListSecretsForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesListSecretsForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_LIST_SECRETS_FOR_AUTHENTICATED_USER,
    'CODESPACES_LIST_SECRETS_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
