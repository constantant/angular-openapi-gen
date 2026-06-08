import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_CAPTIONS_INSERT } from './youtube-captions-insert.token';
import type { YoutubeCaptionsInsertResponse } from './youtube-captions-insert.token';

export function provideYoutubeCaptionsInsertMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeCaptionsInsertResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_CAPTIONS_INSERT,
    'YOUTUBE_CAPTIONS_INSERT',
    initialBehavior,
  );
}
