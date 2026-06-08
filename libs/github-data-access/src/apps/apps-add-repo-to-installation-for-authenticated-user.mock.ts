import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { APPS_ADD_REPO_TO_INSTALLATION_FOR_AUTHENTICATED_USER } from './apps-add-repo-to-installation-for-authenticated-user.token';

export function provideAppsAddRepoToInstallationForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    APPS_ADD_REPO_TO_INSTALLATION_FOR_AUTHENTICATED_USER,
    'APPS_ADD_REPO_TO_INSTALLATION_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
