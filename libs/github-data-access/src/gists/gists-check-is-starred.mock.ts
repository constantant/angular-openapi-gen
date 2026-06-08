import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { GISTS_CHECK_IS_STARRED } from './gists-check-is-starred.token';

export function provideGistsCheckIsStarredMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    GISTS_CHECK_IS_STARRED,
    'GISTS_CHECK_IS_STARRED',
    initialBehavior,
  );
}
