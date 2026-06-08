import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_SET_CODESPACES_ACCESS } from './codespaces-set-codespaces-access.token';

export function provideCodespacesSetCodespacesAccessMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_SET_CODESPACES_ACCESS,
    'CODESPACES_SET_CODESPACES_ACCESS',
    initialBehavior,
  );
}
