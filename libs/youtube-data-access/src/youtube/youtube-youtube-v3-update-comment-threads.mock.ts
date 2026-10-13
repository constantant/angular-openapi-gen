import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import {
  provideYoutubeYoutubeV3UpdateCommentThreads,
  type YoutubeYoutubeV3UpdateCommentThreadsResponse,
} from './youtube-youtube-v3-update-comment-threads.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.youtube.v3.updateCommentThreads',
  path: '/youtube/v3/commentThreads',
  method: 'put',
  tag: 'youtube',
};

export const YOUTUBE_YOUTUBE_V3_UPDATE_COMMENT_THREADS_MOCK: MockEndpoint<YoutubeYoutubeV3UpdateCommentThreadsResponse> =
  {
    key: 'YOUTUBE_YOUTUBE_V3_UPDATE_COMMENT_THREADS',
    baseUrl: YOUTUBE_BASE_URL,
    meta: _meta,
    provide: provideYoutubeYoutubeV3UpdateCommentThreads,
  };

export function provideYoutubeYoutubeV3UpdateCommentThreadsMock(
  initialBehavior?: MockEndpointBehavior<YoutubeYoutubeV3UpdateCommentThreadsResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    YOUTUBE_YOUTUBE_V3_UPDATE_COMMENT_THREADS_MOCK,
    initialBehavior,
  );
}
