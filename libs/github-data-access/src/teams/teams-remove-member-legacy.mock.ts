import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { TEAMS_REMOVE_MEMBER_LEGACY } from './teams-remove-member-legacy.token';

export function provideTeamsRemoveMemberLegacyMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_REMOVE_MEMBER_LEGACY,
    'TEAMS_REMOVE_MEMBER_LEGACY',
    initialBehavior,
  );
}
