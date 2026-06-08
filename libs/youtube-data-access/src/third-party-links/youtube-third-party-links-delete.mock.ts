import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_THIRD_PARTY_LINKS_DELETE } from './youtube-third-party-links-delete.token';

export function provideYoutubeThirdPartyLinksDeleteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_THIRD_PARTY_LINKS_DELETE,
    'YOUTUBE_THIRD_PARTY_LINKS_DELETE',
    initialBehavior,
  );
}
