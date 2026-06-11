import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_CHANNEL_SECTIONS_LIST } from './youtube-channel-sections-list.token';
import type { YoutubeChannelSectionsListResponse } from './youtube-channel-sections-list.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.channelSections.list',
  path: '/youtube/v3/channelSections',
  method: 'get',
  tag: 'channel-sections',
};

export function provideYoutubeChannelSectionsListMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeChannelSectionsListResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_CHANNEL_SECTIONS_LIST,
    'YOUTUBE_CHANNEL_SECTIONS_LIST',
    initialBehavior,
    _meta,
  );
}
