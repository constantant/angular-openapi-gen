import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_PRE_FLIGHT_WITH_REPO_FOR_AUTHENTICATED_USER } from './codespaces-pre-flight-with-repo-for-authenticated-user.token';
import type { CodespacesPreFlightWithRepoForAuthenticatedUserResponse } from './codespaces-pre-flight-with-repo-for-authenticated-user.token';

export function provideCodespacesPreFlightWithRepoForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesPreFlightWithRepoForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_PRE_FLIGHT_WITH_REPO_FOR_AUTHENTICATED_USER,
    'CODESPACES_PRE_FLIGHT_WITH_REPO_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
