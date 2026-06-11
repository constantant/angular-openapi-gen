import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_COMMENTS_SET_MODERATION_STATUS } from './youtube-comments-set-moderation-status.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.comments.setModerationStatus',
  path: '/youtube/v3/comments/setModerationStatus',
  method: 'post',
  tag: 'comments',
};

export function provideYoutubeCommentsSetModerationStatusMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_COMMENTS_SET_MODERATION_STATUS,
    'YOUTUBE_COMMENTS_SET_MODERATION_STATUS',
    initialBehavior,
    _meta,
  );
}
