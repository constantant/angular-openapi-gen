import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_LIVE_CHAT_MODERATORS_DELETE } from './youtube-live-chat-moderators-delete.token';

export function provideYoutubeLiveChatModeratorsDeleteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_LIVE_CHAT_MODERATORS_DELETE,
    'YOUTUBE_LIVE_CHAT_MODERATORS_DELETE',
    initialBehavior,
  );
}
