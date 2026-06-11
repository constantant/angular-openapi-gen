import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_THIRD_PARTY_LINKS_LIST } from './youtube-third-party-links-list.token';
import type { YoutubeThirdPartyLinksListResponse } from './youtube-third-party-links-list.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.thirdPartyLinks.list',
  path: '/youtube/v3/thirdPartyLinks',
  method: 'get',
  tag: 'third-party-links',
};

export function provideYoutubeThirdPartyLinksListMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeThirdPartyLinksListResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_THIRD_PARTY_LINKS_LIST,
    'YOUTUBE_THIRD_PARTY_LINKS_LIST',
    initialBehavior,
    _meta,
  );
}
