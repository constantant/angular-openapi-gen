import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_LIVE_CHAT_MESSAGES_DELETE } from './youtube-live-chat-messages-delete.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.liveChatMessages.delete',
  path: '/youtube/v3/liveChat/messages',
  method: 'delete',
  tag: 'live-chat-messages',
};

export function provideYoutubeLiveChatMessagesDeleteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_LIVE_CHAT_MESSAGES_DELETE,
    'YOUTUBE_LIVE_CHAT_MESSAGES_DELETE',
    initialBehavior,
    _meta,
  );
}
