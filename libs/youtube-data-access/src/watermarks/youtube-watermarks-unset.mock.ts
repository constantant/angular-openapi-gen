import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_WATERMARKS_UNSET } from './youtube-watermarks-unset.token';

export function provideYoutubeWatermarksUnsetMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_WATERMARKS_UNSET,
    'YOUTUBE_WATERMARKS_UNSET',
    initialBehavior,
  );
}
