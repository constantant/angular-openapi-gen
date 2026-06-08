import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_COMMENT_THREADS_INSERT } from './youtube-comment-threads-insert.token';
import type { YoutubeCommentThreadsInsertResponse } from './youtube-comment-threads-insert.token';

export function provideYoutubeCommentThreadsInsertMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeCommentThreadsInsertResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_COMMENT_THREADS_INSERT,
    'YOUTUBE_COMMENT_THREADS_INSERT',
    initialBehavior,
  );
}
