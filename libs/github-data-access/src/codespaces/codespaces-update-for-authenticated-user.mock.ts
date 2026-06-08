import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_UPDATE_FOR_AUTHENTICATED_USER } from './codespaces-update-for-authenticated-user.token';
import type { CodespacesUpdateForAuthenticatedUserResponse } from './codespaces-update-for-authenticated-user.token';

export function provideCodespacesUpdateForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesUpdateForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_UPDATE_FOR_AUTHENTICATED_USER,
    'CODESPACES_UPDATE_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
