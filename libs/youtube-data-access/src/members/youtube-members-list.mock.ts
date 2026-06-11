import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_MEMBERS_LIST } from './youtube-members-list.token';
import type { YoutubeMembersListResponse } from './youtube-members-list.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.members.list',
  path: '/youtube/v3/members',
  method: 'get',
  tag: 'members',
};

export function provideYoutubeMembersListMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeMembersListResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_MEMBERS_LIST,
    'YOUTUBE_MEMBERS_LIST',
    initialBehavior,
    _meta,
  );
}
