import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_LIVE_CHAT_MODERATORS_LIST } from './youtube-live-chat-moderators-list.token';
import type { YoutubeLiveChatModeratorsListResponse } from './youtube-live-chat-moderators-list.token';

export function provideYoutubeLiveChatModeratorsListMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeLiveChatModeratorsListResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_LIVE_CHAT_MODERATORS_LIST,
    'YOUTUBE_LIVE_CHAT_MODERATORS_LIST',
    initialBehavior,
  );
}
