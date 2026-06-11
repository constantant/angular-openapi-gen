import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_LIVE_CHAT_BANS_INSERT } from './youtube-live-chat-bans-insert.token';
import type { YoutubeLiveChatBansInsertResponse } from './youtube-live-chat-bans-insert.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.liveChatBans.insert',
  path: '/youtube/v3/liveChat/bans',
  method: 'post',
  tag: 'live-chat-bans',
};

export function provideYoutubeLiveChatBansInsertMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeLiveChatBansInsertResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_LIVE_CHAT_BANS_INSERT,
    'YOUTUBE_LIVE_CHAT_BANS_INSERT',
    initialBehavior,
    _meta,
  );
}
