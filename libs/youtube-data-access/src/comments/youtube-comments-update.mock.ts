import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_COMMENTS_UPDATE } from './youtube-comments-update.token';
import type { YoutubeCommentsUpdateResponse } from './youtube-comments-update.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.comments.update',
  path: '/youtube/v3/comments',
  method: 'put',
  tag: 'comments',
};

export function provideYoutubeCommentsUpdateMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeCommentsUpdateResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_COMMENTS_UPDATE,
    'YOUTUBE_COMMENTS_UPDATE',
    initialBehavior,
    _meta,
  );
}
