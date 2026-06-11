import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_LIVE_CHAT_BANS_DELETE } from './youtube-live-chat-bans-delete.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.liveChatBans.delete',
  path: '/youtube/v3/liveChat/bans',
  method: 'delete',
  tag: 'live-chat-bans',
};

export function provideYoutubeLiveChatBansDeleteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_LIVE_CHAT_BANS_DELETE,
    'YOUTUBE_LIVE_CHAT_BANS_DELETE',
    initialBehavior,
    _meta,
  );
}
