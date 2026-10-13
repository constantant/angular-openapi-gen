import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import {
  provideYoutubeCommentThreadsInsert,
  type YoutubeCommentThreadsInsertResponse,
} from './youtube-comment-threads-insert.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.commentThreads.insert',
  path: '/youtube/v3/commentThreads',
  method: 'post',
  tag: 'comment-threads',
};

export const YOUTUBE_COMMENT_THREADS_INSERT_MOCK: MockEndpoint<YoutubeCommentThreadsInsertResponse> =
  {
    key: 'YOUTUBE_COMMENT_THREADS_INSERT',
    baseUrl: YOUTUBE_BASE_URL,
    meta: _meta,
    provide: provideYoutubeCommentThreadsInsert,
  };

export function provideYoutubeCommentThreadsInsertMock(
  initialBehavior?: MockEndpointBehavior<YoutubeCommentThreadsInsertResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    YOUTUBE_COMMENT_THREADS_INSERT_MOCK,
    initialBehavior,
  );
}
