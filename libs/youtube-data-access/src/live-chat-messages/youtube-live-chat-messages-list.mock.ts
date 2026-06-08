import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_LIVE_CHAT_MESSAGES_LIST } from './youtube-live-chat-messages-list.token';
import type { YoutubeLiveChatMessagesListResponse } from './youtube-live-chat-messages-list.token';

export function provideYoutubeLiveChatMessagesListMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeLiveChatMessagesListResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_LIVE_CHAT_MESSAGES_LIST,
    'YOUTUBE_LIVE_CHAT_MESSAGES_LIST',
    initialBehavior,
  );
}
