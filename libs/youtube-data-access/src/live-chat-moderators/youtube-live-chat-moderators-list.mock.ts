import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import {
  provideYoutubeLiveChatModeratorsList,
  type YoutubeLiveChatModeratorsListResponse,
} from './youtube-live-chat-moderators-list.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.liveChatModerators.list',
  path: '/youtube/v3/liveChat/moderators',
  method: 'get',
  tag: 'live-chat-moderators',
};

export const YOUTUBE_LIVE_CHAT_MODERATORS_LIST_MOCK: MockEndpoint<YoutubeLiveChatModeratorsListResponse> =
  {
    key: 'YOUTUBE_LIVE_CHAT_MODERATORS_LIST',
    baseUrl: YOUTUBE_BASE_URL,
    meta: _meta,
    provide: provideYoutubeLiveChatModeratorsList,
  };

export function provideYoutubeLiveChatModeratorsListMock(
  initialBehavior?: MockEndpointBehavior<YoutubeLiveChatModeratorsListResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    YOUTUBE_LIVE_CHAT_MODERATORS_LIST_MOCK,
    initialBehavior,
  );
}
