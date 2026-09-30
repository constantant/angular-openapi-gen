import { FactoryProvider } from '@angular/core';
import { provideMockObservable } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
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
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockObservable(
    YOUTUBE_COMMENTS_DELETE,
    'YOUTUBE_COMMENTS_DELETE',
    initialBehavior,
    _meta,
    options,
  );
}
