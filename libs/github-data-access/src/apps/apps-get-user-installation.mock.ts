import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { APPS_GET_USER_INSTALLATION } from './apps-get-user-installation.token';
import type { AppsGetUserInstallationResponse } from './apps-get-user-installation.token';

export function provideAppsGetUserInstallationMock(
  initialBehavior?: ProviderInitialBehavior<AppsGetUserInstallationResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_GET_USER_INSTALLATION,
    'APPS_GET_USER_INSTALLATION',
    initialBehavior,
  );
}
