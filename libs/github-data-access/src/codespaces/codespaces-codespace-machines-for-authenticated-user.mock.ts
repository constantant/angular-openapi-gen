import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_CODESPACE_MACHINES_FOR_AUTHENTICATED_USER } from './codespaces-codespace-machines-for-authenticated-user.token';
import type { CodespacesCodespaceMachinesForAuthenticatedUserResponse } from './codespaces-codespace-machines-for-authenticated-user.token';

export function provideCodespacesCodespaceMachinesForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesCodespaceMachinesForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_CODESPACE_MACHINES_FOR_AUTHENTICATED_USER,
    'CODESPACES_CODESPACE_MACHINES_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
