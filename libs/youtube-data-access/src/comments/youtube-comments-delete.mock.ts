import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_COMMENTS_DELETE } from './youtube-comments-delete.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.comments.delete',
  path: '/youtube/v3/comments',
  method: 'delete',
  tag: 'comments',
};

export function provideYoutubeCommentsDeleteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_COMMENTS_DELETE,
    'YOUTUBE_COMMENTS_DELETE',
    initialBehavior,
    _meta,
  );
}
