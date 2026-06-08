import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_CAPTIONS_LIST } from './youtube-captions-list.token';
import type { YoutubeCaptionsListResponse } from './youtube-captions-list.token';

export function provideYoutubeCaptionsListMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeCaptionsListResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_CAPTIONS_LIST,
    'YOUTUBE_CAPTIONS_LIST',
    initialBehavior,
  );
}
