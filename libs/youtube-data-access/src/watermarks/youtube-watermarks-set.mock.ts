import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_WATERMARKS_SET } from './youtube-watermarks-set.token';

export function provideYoutubeWatermarksSetMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_WATERMARKS_SET,
    'YOUTUBE_WATERMARKS_SET',
    initialBehavior,
  );
}
