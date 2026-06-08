import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_CAPTIONS_DOWNLOAD } from './youtube-captions-download.token';

export function provideYoutubeCaptionsDownloadMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_CAPTIONS_DOWNLOAD,
    'YOUTUBE_CAPTIONS_DOWNLOAD',
    initialBehavior,
  );
}
