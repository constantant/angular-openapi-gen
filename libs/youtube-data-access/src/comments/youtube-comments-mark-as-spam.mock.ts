import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_COMMENTS_MARK_AS_SPAM } from './youtube-comments-mark-as-spam.token';

export function provideYoutubeCommentsMarkAsSpamMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_COMMENTS_MARK_AS_SPAM,
    'YOUTUBE_COMMENTS_MARK_AS_SPAM',
    initialBehavior,
  );
}
