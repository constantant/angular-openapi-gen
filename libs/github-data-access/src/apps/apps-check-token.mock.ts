import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { APPS_CHECK_TOKEN } from './apps-check-token.token';
import type { AppsCheckTokenResponse } from './apps-check-token.token';

export function provideAppsCheckTokenMock(
  initialBehavior?: ProviderInitialBehavior<AppsCheckTokenResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_CHECK_TOKEN,
    'APPS_CHECK_TOKEN',
    initialBehavior,
  );
}
