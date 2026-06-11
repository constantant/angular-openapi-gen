import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_CHANNELS_LIST } from './youtube-channels-list.token';
import type { YoutubeChannelsListResponse } from './youtube-channels-list.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.channels.list',
  path: '/youtube/v3/channels',
  method: 'get',
  tag: 'channels',
};

export function provideYoutubeChannelsListMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeChannelsListResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_CHANNELS_LIST,
    'YOUTUBE_CHANNELS_LIST',
    initialBehavior,
    _meta,
  );
}
