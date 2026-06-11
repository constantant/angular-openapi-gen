import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_SUPER_CHAT_EVENTS_LIST } from './youtube-super-chat-events-list.token';
import type { YoutubeSuperChatEventsListResponse } from './youtube-super-chat-events-list.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.superChatEvents.list',
  path: '/youtube/v3/superChatEvents',
  method: 'get',
  tag: 'super-chat-events',
};

export function provideYoutubeSuperChatEventsListMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeSuperChatEventsListResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_SUPER_CHAT_EVENTS_LIST,
    'YOUTUBE_SUPER_CHAT_EVENTS_LIST',
    initialBehavior,
    _meta,
  );
}
