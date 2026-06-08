import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_VIDEOS_RATE } from './youtube-videos-rate.token';

export function provideYoutubeVideosRateMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_VIDEOS_RATE,
    'YOUTUBE_VIDEOS_RATE',
    initialBehavior,
  );
}
