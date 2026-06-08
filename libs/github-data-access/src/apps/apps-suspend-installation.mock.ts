import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { APPS_SUSPEND_INSTALLATION } from './apps-suspend-installation.token';

export function provideAppsSuspendInstallationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    APPS_SUSPEND_INSTALLATION,
    'APPS_SUSPEND_INSTALLATION',
    initialBehavior,
  );
}
