import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import {
  provideYoutubeThirdPartyLinksInsert,
  type YoutubeThirdPartyLinksInsertResponse,
} from './youtube-third-party-links-insert.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.thirdPartyLinks.insert',
  path: '/youtube/v3/thirdPartyLinks',
  method: 'post',
  tag: 'third-party-links',
};

export const YOUTUBE_THIRD_PARTY_LINKS_INSERT_MOCK: MockEndpoint<YoutubeThirdPartyLinksInsertResponse> =
  {
    key: 'YOUTUBE_THIRD_PARTY_LINKS_INSERT',
    baseUrl: YOUTUBE_BASE_URL,
    meta: _meta,
    provide: provideYoutubeThirdPartyLinksInsert,
  };

export function provideYoutubeThirdPartyLinksInsertMock(
  initialBehavior?: MockEndpointBehavior<YoutubeThirdPartyLinksInsertResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    YOUTUBE_THIRD_PARTY_LINKS_INSERT_MOCK,
    initialBehavior,
  );
}
