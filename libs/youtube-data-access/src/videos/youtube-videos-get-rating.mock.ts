import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import {
  provideYoutubeVideosGetRating,
  type YoutubeVideosGetRatingResponse,
} from './youtube-videos-get-rating.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.videos.getRating',
  path: '/youtube/v3/videos/getRating',
  method: 'get',
  tag: 'videos',
};

export const YOUTUBE_VIDEOS_GET_RATING_MOCK: MockEndpoint<YoutubeVideosGetRatingResponse> =
  {
    key: 'YOUTUBE_VIDEOS_GET_RATING',
    baseUrl: YOUTUBE_BASE_URL,
    meta: _meta,
    provide: provideYoutubeVideosGetRating,
  };

export function provideYoutubeVideosGetRatingMock(
  initialBehavior?: MockEndpointBehavior<YoutubeVideosGetRatingResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(YOUTUBE_VIDEOS_GET_RATING_MOCK, initialBehavior);
}
