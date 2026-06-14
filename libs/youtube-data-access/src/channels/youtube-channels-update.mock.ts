import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_CHANNELS_UPDATE } from './youtube-channels-update.token';
import type { YoutubeChannelsUpdateResponse } from './youtube-channels-update.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.channels.update',
  path: '/youtube/v3/channels',
  method: 'put',
  tag: 'channels',
};

export function provideYoutubeChannelsUpdateMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeChannelsUpdateResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_CHANNELS_UPDATE,
    'YOUTUBE_CHANNELS_UPDATE',
    initialBehavior,
    _meta,
    options,
  );
}
