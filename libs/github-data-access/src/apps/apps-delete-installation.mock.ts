import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { APPS_DELETE_INSTALLATION } from './apps-delete-installation.token';

export function provideAppsDeleteInstallationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    APPS_DELETE_INSTALLATION,
    'APPS_DELETE_INSTALLATION',
    initialBehavior,
  );
}
