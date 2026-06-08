import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REACTIONS_DELETE_FOR_RELEASE } from './reactions-delete-for-release.token';

export function provideReactionsDeleteForReleaseMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REACTIONS_DELETE_FOR_RELEASE,
    'REACTIONS_DELETE_FOR_RELEASE',
    initialBehavior,
  );
}
