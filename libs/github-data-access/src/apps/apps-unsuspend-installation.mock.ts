import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { APPS_UNSUSPEND_INSTALLATION } from './apps-unsuspend-installation.token';

export function provideAppsUnsuspendInstallationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    APPS_UNSUSPEND_INSTALLATION,
    'APPS_UNSUSPEND_INSTALLATION',
    initialBehavior,
  );
}
