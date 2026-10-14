import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { provideYoutubeVideosRate } from './youtube-videos-rate.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.videos.rate',
  path: '/youtube/v3/videos/rate',
  method: 'post',
  tag: 'videos',
};

export const YOUTUBE_VIDEOS_RATE_MOCK: MockEndpoint<unknown> = {
  key: 'YOUTUBE_VIDEOS_RATE',
  baseUrl: YOUTUBE_BASE_URL,
  meta: _meta,
  provide: provideYoutubeVideosRate,
};

export function provideYoutubeVideosRateMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(YOUTUBE_VIDEOS_RATE_MOCK, initialBehavior);
}
