import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import {
  provideYoutubeSearchList,
  type YoutubeSearchListResponse,
} from './youtube-search-list.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.search.list',
  path: '/youtube/v3/search',
  method: 'get',
  tag: 'search',
};

export const YOUTUBE_SEARCH_LIST_MOCK: MockEndpoint<YoutubeSearchListResponse> =
  {
    key: 'YOUTUBE_SEARCH_LIST',
    baseUrl: YOUTUBE_BASE_URL,
    meta: _meta,
    provide: provideYoutubeSearchList,
  };

export function provideYoutubeSearchListMock(
  initialBehavior?: MockEndpointBehavior<YoutubeSearchListResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(YOUTUBE_SEARCH_LIST_MOCK, initialBehavior);
}
