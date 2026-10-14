import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import {
  provideYoutubeSuperChatEventsList,
  type YoutubeSuperChatEventsListResponse,
} from './youtube-super-chat-events-list.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.superChatEvents.list',
  path: '/youtube/v3/superChatEvents',
  method: 'get',
  tag: 'super-chat-events',
};

export const YOUTUBE_SUPER_CHAT_EVENTS_LIST_MOCK: MockEndpoint<YoutubeSuperChatEventsListResponse> =
  {
    key: 'YOUTUBE_SUPER_CHAT_EVENTS_LIST',
    baseUrl: YOUTUBE_BASE_URL,
    meta: _meta,
    provide: provideYoutubeSuperChatEventsList,
  };

export function provideYoutubeSuperChatEventsListMock(
  initialBehavior?: MockEndpointBehavior<YoutubeSuperChatEventsListResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    YOUTUBE_SUPER_CHAT_EVENTS_LIST_MOCK,
    initialBehavior,
  );
}
