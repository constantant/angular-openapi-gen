import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { APPS_GET_ORG_INSTALLATION } from './apps-get-org-installation.token';
import type { AppsGetOrgInstallationResponse } from './apps-get-org-installation.token';

export function provideAppsGetOrgInstallationMock(
  initialBehavior?: ProviderInitialBehavior<AppsGetOrgInstallationResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_GET_ORG_INSTALLATION,
    'APPS_GET_ORG_INSTALLATION',
    initialBehavior,
  );
}
