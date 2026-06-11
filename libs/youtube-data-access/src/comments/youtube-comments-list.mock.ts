import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_COMMENTS_LIST } from './youtube-comments-list.token';
import type { YoutubeCommentsListResponse } from './youtube-comments-list.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.comments.list',
  path: '/youtube/v3/comments',
  method: 'get',
  tag: 'comments',
};

export function provideYoutubeCommentsListMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeCommentsListResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_COMMENTS_LIST,
    'YOUTUBE_COMMENTS_LIST',
    initialBehavior,
    _meta,
  );
}
