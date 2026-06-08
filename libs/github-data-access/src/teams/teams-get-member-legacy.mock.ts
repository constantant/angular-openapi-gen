import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { TEAMS_GET_MEMBER_LEGACY } from './teams-get-member-legacy.token';

export function provideTeamsGetMemberLegacyMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_GET_MEMBER_LEGACY,
    'TEAMS_GET_MEMBER_LEGACY',
    initialBehavior,
  );
}
