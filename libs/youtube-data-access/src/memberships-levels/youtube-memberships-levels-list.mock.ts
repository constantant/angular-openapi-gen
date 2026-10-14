import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import {
  provideYoutubeMembershipsLevelsList,
  type YoutubeMembershipsLevelsListResponse,
} from './youtube-memberships-levels-list.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.membershipsLevels.list',
  path: '/youtube/v3/membershipsLevels',
  method: 'get',
  tag: 'memberships-levels',
};

export const YOUTUBE_MEMBERSHIPS_LEVELS_LIST_MOCK: MockEndpoint<YoutubeMembershipsLevelsListResponse> =
  {
    key: 'YOUTUBE_MEMBERSHIPS_LEVELS_LIST',
    baseUrl: YOUTUBE_BASE_URL,
    meta: _meta,
    provide: provideYoutubeMembershipsLevelsList,
  };

export function provideYoutubeMembershipsLevelsListMock(
  initialBehavior?: MockEndpointBehavior<YoutubeMembershipsLevelsListResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    YOUTUBE_MEMBERSHIPS_LEVELS_LIST_MOCK,
    initialBehavior,
  );
}
