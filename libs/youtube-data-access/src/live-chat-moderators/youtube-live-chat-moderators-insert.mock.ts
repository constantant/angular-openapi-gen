import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_LIVE_CHAT_MODERATORS_INSERT } from './youtube-live-chat-moderators-insert.token';
import type { YoutubeLiveChatModeratorsInsertResponse } from './youtube-live-chat-moderators-insert.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.liveChatModerators.insert',
  path: '/youtube/v3/liveChat/moderators',
  method: 'post',
  tag: 'live-chat-moderators',
};

export function provideYoutubeLiveChatModeratorsInsertMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeLiveChatModeratorsInsertResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_LIVE_CHAT_MODERATORS_INSERT,
    'YOUTUBE_LIVE_CHAT_MODERATORS_INSERT',
    initialBehavior,
    _meta,
  );
}
