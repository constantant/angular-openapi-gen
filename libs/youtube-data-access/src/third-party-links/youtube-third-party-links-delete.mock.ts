import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_THIRD_PARTY_LINKS_DELETE } from './youtube-third-party-links-delete.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.thirdPartyLinks.delete',
  path: '/youtube/v3/thirdPartyLinks',
  method: 'delete',
  tag: 'third-party-links',
};

export function provideYoutubeThirdPartyLinksDeleteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_THIRD_PARTY_LINKS_DELETE,
    'YOUTUBE_THIRD_PARTY_LINKS_DELETE',
    initialBehavior,
    _meta,
  );
}
