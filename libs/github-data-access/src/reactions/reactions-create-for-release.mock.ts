import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REACTIONS_CREATE_FOR_RELEASE } from './reactions-create-for-release.token';
import type { ReactionsCreateForReleaseResponse } from './reactions-create-for-release.token';

export function provideReactionsCreateForReleaseMock(
  initialBehavior?: ProviderInitialBehavior<ReactionsCreateForReleaseResponse>,
): FactoryProvider {
  return provideMockResource(
    REACTIONS_CREATE_FOR_RELEASE,
    'REACTIONS_CREATE_FOR_RELEASE',
    initialBehavior,
  );
}
