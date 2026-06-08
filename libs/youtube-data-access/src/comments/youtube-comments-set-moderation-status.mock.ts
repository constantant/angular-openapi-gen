import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_COMMENTS_SET_MODERATION_STATUS } from './youtube-comments-set-moderation-status.token';

export function provideYoutubeCommentsSetModerationStatusMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_COMMENTS_SET_MODERATION_STATUS,
    'YOUTUBE_COMMENTS_SET_MODERATION_STATUS',
    initialBehavior,
  );
}
