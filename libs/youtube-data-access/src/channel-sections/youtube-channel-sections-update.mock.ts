import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_CHANNEL_SECTIONS_UPDATE } from './youtube-channel-sections-update.token';
import type { YoutubeChannelSectionsUpdateResponse } from './youtube-channel-sections-update.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.channelSections.update',
  path: '/youtube/v3/channelSections',
  method: 'put',
  tag: 'channel-sections',
};

export function provideYoutubeChannelSectionsUpdateMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeChannelSectionsUpdateResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_CHANNEL_SECTIONS_UPDATE,
    'YOUTUBE_CHANNEL_SECTIONS_UPDATE',
    initialBehavior,
    _meta,
  );
}
