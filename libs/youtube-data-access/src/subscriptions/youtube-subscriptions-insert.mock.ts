import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import {
  provideYoutubeSubscriptionsInsert,
  type YoutubeSubscriptionsInsertResponse,
} from './youtube-subscriptions-insert.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.subscriptions.insert',
  path: '/youtube/v3/subscriptions',
  method: 'post',
  tag: 'subscriptions',
};

export const YOUTUBE_SUBSCRIPTIONS_INSERT_MOCK: MockEndpoint<YoutubeSubscriptionsInsertResponse> =
  {
    key: 'YOUTUBE_SUBSCRIPTIONS_INSERT',
    baseUrl: YOUTUBE_BASE_URL,
    meta: _meta,
    provide: provideYoutubeSubscriptionsInsert,
  };

export function provideYoutubeSubscriptionsInsertMock(
  initialBehavior?: MockEndpointBehavior<YoutubeSubscriptionsInsertResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    YOUTUBE_SUBSCRIPTIONS_INSERT_MOCK,
    initialBehavior,
  );
}
