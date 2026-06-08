import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { TEAMS_ADD_MEMBER_LEGACY } from './teams-add-member-legacy.token';

export function provideTeamsAddMemberLegacyMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_ADD_MEMBER_LEGACY,
    'TEAMS_ADD_MEMBER_LEGACY',
    initialBehavior,
  );
}
