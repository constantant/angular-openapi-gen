import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_LIVE_CHAT_MESSAGES_INSERT } from './youtube-live-chat-messages-insert.token';
import type { YoutubeLiveChatMessagesInsertResponse } from './youtube-live-chat-messages-insert.token';

export function provideYoutubeLiveChatMessagesInsertMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeLiveChatMessagesInsertResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_LIVE_CHAT_MESSAGES_INSERT,
    'YOUTUBE_LIVE_CHAT_MESSAGES_INSERT',
    initialBehavior,
  );
}
