import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { provideYoutubeLiveChatMessagesDelete } from './youtube-live-chat-messages-delete.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.liveChatMessages.delete',
  path: '/youtube/v3/liveChat/messages',
  method: 'delete',
  tag: 'live-chat-messages',
};

export const YOUTUBE_LIVE_CHAT_MESSAGES_DELETE_MOCK: MockEndpoint<unknown> = {
  key: 'YOUTUBE_LIVE_CHAT_MESSAGES_DELETE',
  baseUrl: YOUTUBE_BASE_URL,
  meta: _meta,
  provide: provideYoutubeLiveChatMessagesDelete,
};

export function provideYoutubeLiveChatMessagesDeleteMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(
    YOUTUBE_LIVE_CHAT_MESSAGES_DELETE_MOCK,
    initialBehavior,
  );
}
