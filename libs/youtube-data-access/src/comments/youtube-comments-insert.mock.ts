import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_COMMENTS_INSERT } from './youtube-comments-insert.token';
import type { YoutubeCommentsInsertResponse } from './youtube-comments-insert.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.comments.insert',
  path: '/youtube/v3/comments',
  method: 'post',
  tag: 'comments',
};

export function provideYoutubeCommentsInsertMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeCommentsInsertResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_COMMENTS_INSERT,
    'YOUTUBE_COMMENTS_INSERT',
    initialBehavior,
    _meta,
  );
}
