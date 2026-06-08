import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_GET_FOR_AUTHENTICATED_USER } from './codespaces-get-for-authenticated-user.token';
import type { CodespacesGetForAuthenticatedUserResponse } from './codespaces-get-for-authenticated-user.token';

export function provideCodespacesGetForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesGetForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_GET_FOR_AUTHENTICATED_USER,
    'CODESPACES_GET_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
