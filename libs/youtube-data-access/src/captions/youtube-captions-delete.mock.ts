import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_CAPTIONS_DELETE } from './youtube-captions-delete.token';

export function provideYoutubeCaptionsDeleteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_CAPTIONS_DELETE,
    'YOUTUBE_CAPTIONS_DELETE',
    initialBehavior,
  );
}
