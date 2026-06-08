import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_MEMBERSHIPS_LEVELS_LIST } from './youtube-memberships-levels-list.token';
import type { YoutubeMembershipsLevelsListResponse } from './youtube-memberships-levels-list.token';

export function provideYoutubeMembershipsLevelsListMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeMembershipsLevelsListResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_MEMBERSHIPS_LEVELS_LIST,
    'YOUTUBE_MEMBERSHIPS_LEVELS_LIST',
    initialBehavior,
  );
}
