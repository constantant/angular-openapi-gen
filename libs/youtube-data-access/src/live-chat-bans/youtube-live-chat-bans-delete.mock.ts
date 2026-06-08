import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_LIVE_CHAT_BANS_DELETE } from './youtube-live-chat-bans-delete.token';

export function provideYoutubeLiveChatBansDeleteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_LIVE_CHAT_BANS_DELETE,
    'YOUTUBE_LIVE_CHAT_BANS_DELETE',
    initialBehavior,
  );
}
