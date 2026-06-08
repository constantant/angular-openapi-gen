import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_CHANNEL_SECTIONS_LIST } from './youtube-channel-sections-list.token';
import type { YoutubeChannelSectionsListResponse } from './youtube-channel-sections-list.token';

export function provideYoutubeChannelSectionsListMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeChannelSectionsListResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_CHANNEL_SECTIONS_LIST,
    'YOUTUBE_CHANNEL_SECTIONS_LIST',
    initialBehavior,
  );
}
