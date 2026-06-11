import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_COMMENT_THREADS_LIST } from './youtube-comment-threads-list.token';
import type { YoutubeCommentThreadsListResponse } from './youtube-comment-threads-list.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.commentThreads.list',
  path: '/youtube/v3/commentThreads',
  method: 'get',
  tag: 'comment-threads',
};

export function provideYoutubeCommentThreadsListMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeCommentThreadsListResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_COMMENT_THREADS_LIST,
    'YOUTUBE_COMMENT_THREADS_LIST',
    initialBehavior,
    _meta,
  );
}
