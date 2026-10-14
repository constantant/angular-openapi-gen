import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import {
  provideYoutubeVideosInsert,
  type YoutubeVideosInsertResponse,
} from './youtube-videos-insert.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.videos.insert',
  path: '/youtube/v3/videos',
  method: 'post',
  tag: 'videos',
};

export const YOUTUBE_VIDEOS_INSERT_MOCK: MockEndpoint<YoutubeVideosInsertResponse> =
  {
    key: 'YOUTUBE_VIDEOS_INSERT',
    baseUrl: YOUTUBE_BASE_URL,
    meta: _meta,
    provide: provideYoutubeVideosInsert,
  };

export function provideYoutubeVideosInsertMock(
  initialBehavior?: MockEndpointBehavior<YoutubeVideosInsertResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(YOUTUBE_VIDEOS_INSERT_MOCK, initialBehavior);
}
