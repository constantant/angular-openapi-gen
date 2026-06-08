import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { APPS_DELETE_TOKEN } from './apps-delete-token.token';

export function provideAppsDeleteTokenMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    APPS_DELETE_TOKEN,
    'APPS_DELETE_TOKEN',
    initialBehavior,
  );
}
