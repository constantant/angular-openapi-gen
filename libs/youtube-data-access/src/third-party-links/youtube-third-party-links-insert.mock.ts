import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_THIRD_PARTY_LINKS_INSERT } from './youtube-third-party-links-insert.token';
import type { YoutubeThirdPartyLinksInsertResponse } from './youtube-third-party-links-insert.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.thirdPartyLinks.insert',
  path: '/youtube/v3/thirdPartyLinks',
  method: 'post',
  tag: 'third-party-links',
};

export function provideYoutubeThirdPartyLinksInsertMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeThirdPartyLinksInsertResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_THIRD_PARTY_LINKS_INSERT,
    'YOUTUBE_THIRD_PARTY_LINKS_INSERT',
    initialBehavior,
    _meta,
  );
}
