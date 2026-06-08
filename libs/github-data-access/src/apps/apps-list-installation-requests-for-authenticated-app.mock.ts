import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { APPS_LIST_INSTALLATION_REQUESTS_FOR_AUTHENTICATED_APP } from './apps-list-installation-requests-for-authenticated-app.token';
import type { AppsListInstallationRequestsForAuthenticatedAppResponse } from './apps-list-installation-requests-for-authenticated-app.token';

export function provideAppsListInstallationRequestsForAuthenticatedAppMock(
  initialBehavior?: ProviderInitialBehavior<AppsListInstallationRequestsForAuthenticatedAppResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_LIST_INSTALLATION_REQUESTS_FOR_AUTHENTICATED_APP,
    'APPS_LIST_INSTALLATION_REQUESTS_FOR_AUTHENTICATED_APP',
    initialBehavior,
  );
}
