import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_THIRD_PARTY_LINKS_UPDATE } from './youtube-third-party-links-update.token';
import type { YoutubeThirdPartyLinksUpdateResponse } from './youtube-third-party-links-update.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.thirdPartyLinks.update',
  path: '/youtube/v3/thirdPartyLinks',
  method: 'put',
  tag: 'third-party-links',
};

export function provideYoutubeThirdPartyLinksUpdateMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeThirdPartyLinksUpdateResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_THIRD_PARTY_LINKS_UPDATE,
    'YOUTUBE_THIRD_PARTY_LINKS_UPDATE',
    initialBehavior,
    _meta,
  );
}
