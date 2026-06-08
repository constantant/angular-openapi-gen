import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { TEAMS_DELETE_LEGACY } from './teams-delete-legacy.token';

export function provideTeamsDeleteLegacyMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_DELETE_LEGACY,
    'TEAMS_DELETE_LEGACY',
    initialBehavior,
  );
}
