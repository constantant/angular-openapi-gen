import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_CREATE_FOR_AUTHENTICATED_USER } from './codespaces-create-for-authenticated-user.token';
import type { CodespacesCreateForAuthenticatedUserResponse } from './codespaces-create-for-authenticated-user.token';

export function provideCodespacesCreateForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesCreateForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_CREATE_FOR_AUTHENTICATED_USER,
    'CODESPACES_CREATE_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
