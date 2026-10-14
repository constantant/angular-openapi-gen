import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import {
  provideYoutubeCaptionsInsert,
  type YoutubeCaptionsInsertResponse,
} from './youtube-captions-insert.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.captions.insert',
  path: '/youtube/v3/captions',
  method: 'post',
  tag: 'captions',
};

export const YOUTUBE_CAPTIONS_INSERT_MOCK: MockEndpoint<YoutubeCaptionsInsertResponse> =
  {
    key: 'YOUTUBE_CAPTIONS_INSERT',
    baseUrl: YOUTUBE_BASE_URL,
    meta: _meta,
    provide: provideYoutubeCaptionsInsert,
  };

export function provideYoutubeCaptionsInsertMock(
  initialBehavior?: MockEndpointBehavior<YoutubeCaptionsInsertResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(YOUTUBE_CAPTIONS_INSERT_MOCK, initialBehavior);
}
