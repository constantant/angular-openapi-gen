import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { APPS_CREATE_INSTALLATION_ACCESS_TOKEN } from './apps-create-installation-access-token.token';
import type { AppsCreateInstallationAccessTokenResponse } from './apps-create-installation-access-token.token';

export function provideAppsCreateInstallationAccessTokenMock(
  initialBehavior?: ProviderInitialBehavior<AppsCreateInstallationAccessTokenResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_CREATE_INSTALLATION_ACCESS_TOKEN,
    'APPS_CREATE_INSTALLATION_ACCESS_TOKEN',
    initialBehavior,
  );
}
