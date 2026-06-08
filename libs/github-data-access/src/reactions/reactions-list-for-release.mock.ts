import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REACTIONS_LIST_FOR_RELEASE } from './reactions-list-for-release.token';
import type { ReactionsListForReleaseResponse } from './reactions-list-for-release.token';

export function provideReactionsListForReleaseMock(
  initialBehavior?: ProviderInitialBehavior<ReactionsListForReleaseResponse>,
): FactoryProvider {
  return provideMockResource(
    REACTIONS_LIST_FOR_RELEASE,
    'REACTIONS_LIST_FOR_RELEASE',
    initialBehavior,
  );
}
