import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import {
  provideYoutubeThirdPartyLinksUpdate,
  type YoutubeThirdPartyLinksUpdateResponse,
} from './youtube-third-party-links-update.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.thirdPartyLinks.update',
  path: '/youtube/v3/thirdPartyLinks',
  method: 'put',
  tag: 'third-party-links',
};

export const YOUTUBE_THIRD_PARTY_LINKS_UPDATE_MOCK: MockEndpoint<YoutubeThirdPartyLinksUpdateResponse> =
  {
    key: 'YOUTUBE_THIRD_PARTY_LINKS_UPDATE',
    baseUrl: YOUTUBE_BASE_URL,
    meta: _meta,
    provide: provideYoutubeThirdPartyLinksUpdate,
  };

export function provideYoutubeThirdPartyLinksUpdateMock(
  initialBehavior?: MockEndpointBehavior<YoutubeThirdPartyLinksUpdateResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    YOUTUBE_THIRD_PARTY_LINKS_UPDATE_MOCK,
    initialBehavior,
  );
}
