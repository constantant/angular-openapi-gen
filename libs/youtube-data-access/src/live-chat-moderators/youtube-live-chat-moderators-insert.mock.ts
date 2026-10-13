import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import {
  provideYoutubeLiveChatModeratorsInsert,
  type YoutubeLiveChatModeratorsInsertResponse,
} from './youtube-live-chat-moderators-insert.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.liveChatModerators.insert',
  path: '/youtube/v3/liveChat/moderators',
  method: 'post',
  tag: 'live-chat-moderators',
};

export const YOUTUBE_LIVE_CHAT_MODERATORS_INSERT_MOCK: MockEndpoint<YoutubeLiveChatModeratorsInsertResponse> =
  {
    key: 'YOUTUBE_LIVE_CHAT_MODERATORS_INSERT',
    baseUrl: YOUTUBE_BASE_URL,
    meta: _meta,
    provide: provideYoutubeLiveChatModeratorsInsert,
  };

export function provideYoutubeLiveChatModeratorsInsertMock(
  initialBehavior?: MockEndpointBehavior<YoutubeLiveChatModeratorsInsertResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    YOUTUBE_LIVE_CHAT_MODERATORS_INSERT_MOCK,
    initialBehavior,
  );
}
