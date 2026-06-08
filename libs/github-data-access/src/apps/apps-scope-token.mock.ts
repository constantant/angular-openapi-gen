import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { APPS_SCOPE_TOKEN } from './apps-scope-token.token';
import type { AppsScopeTokenResponse } from './apps-scope-token.token';

export function provideAppsScopeTokenMock(
  initialBehavior?: ProviderInitialBehavior<AppsScopeTokenResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_SCOPE_TOKEN,
    'APPS_SCOPE_TOKEN',
    initialBehavior,
  );
}
