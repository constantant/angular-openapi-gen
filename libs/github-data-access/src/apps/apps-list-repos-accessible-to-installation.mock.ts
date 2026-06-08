import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { APPS_LIST_REPOS_ACCESSIBLE_TO_INSTALLATION } from './apps-list-repos-accessible-to-installation.token';
import type { AppsListReposAccessibleToInstallationResponse } from './apps-list-repos-accessible-to-installation.token';

export function provideAppsListReposAccessibleToInstallationMock(
  initialBehavior?: ProviderInitialBehavior<AppsListReposAccessibleToInstallationResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_LIST_REPOS_ACCESSIBLE_TO_INSTALLATION,
    'APPS_LIST_REPOS_ACCESSIBLE_TO_INSTALLATION',
    initialBehavior,
  );
}
