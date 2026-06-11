import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_CHANNEL_SECTIONS_DELETE } from './youtube-channel-sections-delete.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.channelSections.delete',
  path: '/youtube/v3/channelSections',
  method: 'delete',
  tag: 'channel-sections',
};

export function provideYoutubeChannelSectionsDeleteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_CHANNEL_SECTIONS_DELETE,
    'YOUTUBE_CHANNEL_SECTIONS_DELETE',
    initialBehavior,
    _meta,
  );
}
