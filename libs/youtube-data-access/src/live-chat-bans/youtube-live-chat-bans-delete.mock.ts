import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { provideYoutubeLiveChatBansDelete } from './youtube-live-chat-bans-delete.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.liveChatBans.delete',
  path: '/youtube/v3/liveChat/bans',
  method: 'delete',
  tag: 'live-chat-bans',
};

export const YOUTUBE_LIVE_CHAT_BANS_DELETE_MOCK: MockEndpoint<unknown> = {
  key: 'YOUTUBE_LIVE_CHAT_BANS_DELETE',
  baseUrl: YOUTUBE_BASE_URL,
  meta: _meta,
  provide: provideYoutubeLiveChatBansDelete,
};

export function provideYoutubeLiveChatBansDeleteMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(
    YOUTUBE_LIVE_CHAT_BANS_DELETE_MOCK,
    initialBehavior,
  );
}
