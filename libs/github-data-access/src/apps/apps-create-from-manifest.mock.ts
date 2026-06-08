import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { APPS_CREATE_FROM_MANIFEST } from './apps-create-from-manifest.token';
import type { AppsCreateFromManifestResponse } from './apps-create-from-manifest.token';

export function provideAppsCreateFromManifestMock(
  initialBehavior?: ProviderInitialBehavior<AppsCreateFromManifestResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_CREATE_FROM_MANIFEST,
    'APPS_CREATE_FROM_MANIFEST',
    initialBehavior,
  );
}
