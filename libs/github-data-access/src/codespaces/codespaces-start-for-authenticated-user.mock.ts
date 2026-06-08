import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_START_FOR_AUTHENTICATED_USER } from './codespaces-start-for-authenticated-user.token';
import type { CodespacesStartForAuthenticatedUserResponse } from './codespaces-start-for-authenticated-user.token';

export function provideCodespacesStartForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesStartForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_START_FOR_AUTHENTICATED_USER,
    'CODESPACES_START_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
