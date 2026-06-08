import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { APPS_REMOVE_REPO_FROM_INSTALLATION_FOR_AUTHENTICATED_USER } from './apps-remove-repo-from-installation-for-authenticated-user.token';

export function provideAppsRemoveRepoFromInstallationForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    APPS_REMOVE_REPO_FROM_INSTALLATION_FOR_AUTHENTICATED_USER,
    'APPS_REMOVE_REPO_FROM_INSTALLATION_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
