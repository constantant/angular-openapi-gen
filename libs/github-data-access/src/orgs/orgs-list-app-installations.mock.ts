import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_APP_INSTALLATIONS } from './orgs-list-app-installations.token';
import type { OrgsListAppInstallationsResponse } from './orgs-list-app-installations.token';

export function provideOrgsListAppInstallationsMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListAppInstallationsResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_APP_INSTALLATIONS,
    'ORGS_LIST_APP_INSTALLATIONS',
    initialBehavior,
  );
}
