import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { APPS_LIST_INSTALLATIONS } from './apps-list-installations.token';
import type { AppsListInstallationsResponse } from './apps-list-installations.token';

export function provideAppsListInstallationsMock(
  initialBehavior?: ProviderInitialBehavior<AppsListInstallationsResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_LIST_INSTALLATIONS,
    'APPS_LIST_INSTALLATIONS',
    initialBehavior,
  );
}
