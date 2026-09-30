import { FactoryProvider } from '@angular/core';
import { provideMockObservable } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
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
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockObservable(
    YOUTUBE_LIVE_CHAT_BANS_DELETE,
    'YOUTUBE_LIVE_CHAT_BANS_DELETE',
    initialBehavior,
    _meta,
    options,
  );
}
