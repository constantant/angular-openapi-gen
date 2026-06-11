import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_LIVE_CHAT_MESSAGES_LIST } from './youtube-live-chat-messages-list.token';
import type { YoutubeLiveChatMessagesListResponse } from './youtube-live-chat-messages-list.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.liveChatMessages.list',
  path: '/youtube/v3/liveChat/messages',
  method: 'get',
  tag: 'live-chat-messages',
};

export function provideYoutubeLiveChatMessagesListMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeLiveChatMessagesListResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_LIVE_CHAT_MESSAGES_LIST,
    'YOUTUBE_LIVE_CHAT_MESSAGES_LIST',
    initialBehavior,
    _meta,
  );
}
