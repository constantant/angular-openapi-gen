import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_GET_PUBLIC_KEY_FOR_AUTHENTICATED_USER } from './codespaces-get-public-key-for-authenticated-user.token';
import type { CodespacesGetPublicKeyForAuthenticatedUserResponse } from './codespaces-get-public-key-for-authenticated-user.token';

export function provideCodespacesGetPublicKeyForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesGetPublicKeyForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_GET_PUBLIC_KEY_FOR_AUTHENTICATED_USER,
    'CODESPACES_GET_PUBLIC_KEY_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
