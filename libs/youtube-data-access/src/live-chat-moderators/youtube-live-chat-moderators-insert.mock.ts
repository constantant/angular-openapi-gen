import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_LIVE_CHAT_MODERATORS_INSERT } from './youtube-live-chat-moderators-insert.token';
import type { YoutubeLiveChatModeratorsInsertResponse } from './youtube-live-chat-moderators-insert.token';

export function provideYoutubeLiveChatModeratorsInsertMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeLiveChatModeratorsInsertResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_LIVE_CHAT_MODERATORS_INSERT,
    'YOUTUBE_LIVE_CHAT_MODERATORS_INSERT',
    initialBehavior,
  );
}
