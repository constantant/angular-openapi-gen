import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_CHANNEL_SECTIONS_DELETE } from './youtube-channel-sections-delete.token';

export function provideYoutubeChannelSectionsDeleteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_CHANNEL_SECTIONS_DELETE,
    'YOUTUBE_CHANNEL_SECTIONS_DELETE',
    initialBehavior,
  );
}
