import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_COMMENTS_MARK_AS_SPAM } from './youtube-comments-mark-as-spam.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.comments.markAsSpam',
  path: '/youtube/v3/comments/markAsSpam',
  method: 'post',
  tag: 'comments',
};

export function provideYoutubeCommentsMarkAsSpamMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_COMMENTS_MARK_AS_SPAM,
    'YOUTUBE_COMMENTS_MARK_AS_SPAM',
    initialBehavior,
    _meta,
  );
}
