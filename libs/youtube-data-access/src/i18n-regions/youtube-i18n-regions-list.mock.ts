import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import {
  provideYoutubeI18nRegionsList,
  type YoutubeI18nRegionsListResponse,
} from './youtube-i18n-regions-list.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.i18nRegions.list',
  path: '/youtube/v3/i18nRegions',
  method: 'get',
  tag: 'i18n-regions',
};

export const YOUTUBE_I18N_REGIONS_LIST_MOCK: MockEndpoint<YoutubeI18nRegionsListResponse> =
  {
    key: 'YOUTUBE_I18N_REGIONS_LIST',
    baseUrl: YOUTUBE_BASE_URL,
    meta: _meta,
    provide: provideYoutubeI18nRegionsList,
  };

export function provideYoutubeI18nRegionsListMock(
  initialBehavior?: MockEndpointBehavior<YoutubeI18nRegionsListResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(YOUTUBE_I18N_REGIONS_LIST_MOCK, initialBehavior);
}
