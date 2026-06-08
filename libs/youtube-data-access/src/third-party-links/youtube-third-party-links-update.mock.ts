import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_THIRD_PARTY_LINKS_UPDATE } from './youtube-third-party-links-update.token';
import type { YoutubeThirdPartyLinksUpdateResponse } from './youtube-third-party-links-update.token';

export function provideYoutubeThirdPartyLinksUpdateMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeThirdPartyLinksUpdateResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_THIRD_PARTY_LINKS_UPDATE,
    'YOUTUBE_THIRD_PARTY_LINKS_UPDATE',
    initialBehavior,
  );
}
