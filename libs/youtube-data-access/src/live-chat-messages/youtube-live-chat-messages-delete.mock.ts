import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_LIVE_CHAT_MESSAGES_DELETE } from './youtube-live-chat-messages-delete.token';

export function provideYoutubeLiveChatMessagesDeleteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_LIVE_CHAT_MESSAGES_DELETE,
    'YOUTUBE_LIVE_CHAT_MESSAGES_DELETE',
    initialBehavior,
  );
}
