import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_STOP_FOR_AUTHENTICATED_USER } from './codespaces-stop-for-authenticated-user.token';
import type { CodespacesStopForAuthenticatedUserResponse } from './codespaces-stop-for-authenticated-user.token';

export function provideCodespacesStopForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesStopForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_STOP_FOR_AUTHENTICATED_USER,
    'CODESPACES_STOP_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
