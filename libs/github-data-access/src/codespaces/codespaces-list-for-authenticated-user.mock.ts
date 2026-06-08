import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_LIST_FOR_AUTHENTICATED_USER } from './codespaces-list-for-authenticated-user.token';
import type { CodespacesListForAuthenticatedUserResponse } from './codespaces-list-for-authenticated-user.token';

export function provideCodespacesListForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesListForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_LIST_FOR_AUTHENTICATED_USER,
    'CODESPACES_LIST_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
