import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_THUMBNAILS_SET } from './youtube-thumbnails-set.token';
import type { YoutubeThumbnailsSetResponse } from './youtube-thumbnails-set.token';

export function provideYoutubeThumbnailsSetMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeThumbnailsSetResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_THUMBNAILS_SET,
    'YOUTUBE_THUMBNAILS_SET',
    initialBehavior,
  );
}
