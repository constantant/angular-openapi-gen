import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { APPS_GET_REPO_INSTALLATION } from './apps-get-repo-installation.token';
import type { AppsGetRepoInstallationResponse } from './apps-get-repo-installation.token';

export function provideAppsGetRepoInstallationMock(
  initialBehavior?: ProviderInitialBehavior<AppsGetRepoInstallationResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_GET_REPO_INSTALLATION,
    'APPS_GET_REPO_INSTALLATION',
    initialBehavior,
  );
}
