import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { provideYoutubeLiveChatModeratorsDelete } from './youtube-live-chat-moderators-delete.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.liveChatModerators.delete',
  path: '/youtube/v3/liveChat/moderators',
  method: 'delete',
  tag: 'live-chat-moderators',
};

export const YOUTUBE_LIVE_CHAT_MODERATORS_DELETE_MOCK: MockEndpoint<unknown> = {
  key: 'YOUTUBE_LIVE_CHAT_MODERATORS_DELETE',
  baseUrl: YOUTUBE_BASE_URL,
  meta: _meta,
  provide: provideYoutubeLiveChatModeratorsDelete,
};

export function provideYoutubeLiveChatModeratorsDeleteMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(
    YOUTUBE_LIVE_CHAT_MODERATORS_DELETE_MOCK,
    initialBehavior,
  );
}
