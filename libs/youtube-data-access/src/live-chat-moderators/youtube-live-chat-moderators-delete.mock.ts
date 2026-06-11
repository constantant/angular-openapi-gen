import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_LIVE_CHAT_MODERATORS_DELETE } from './youtube-live-chat-moderators-delete.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.liveChatModerators.delete',
  path: '/youtube/v3/liveChat/moderators',
  method: 'delete',
  tag: 'live-chat-moderators',
};

export function provideYoutubeLiveChatModeratorsDeleteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_LIVE_CHAT_MODERATORS_DELETE,
    'YOUTUBE_LIVE_CHAT_MODERATORS_DELETE',
    initialBehavior,
    _meta,
  );
}
