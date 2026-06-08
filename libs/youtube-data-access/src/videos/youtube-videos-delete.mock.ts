import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_VIDEOS_DELETE } from './youtube-videos-delete.token';

export function provideYoutubeVideosDeleteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_VIDEOS_DELETE,
    'YOUTUBE_VIDEOS_DELETE',
    initialBehavior,
  );
}
