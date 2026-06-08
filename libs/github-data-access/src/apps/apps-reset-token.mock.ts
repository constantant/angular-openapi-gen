import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { APPS_RESET_TOKEN } from './apps-reset-token.token';
import type { AppsResetTokenResponse } from './apps-reset-token.token';

export function provideAppsResetTokenMock(
  initialBehavior?: ProviderInitialBehavior<AppsResetTokenResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_RESET_TOKEN,
    'APPS_RESET_TOKEN',
    initialBehavior,
  );
}
