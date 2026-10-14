import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import {
  provideYoutubeActivitiesList,
  type YoutubeActivitiesListResponse,
} from './youtube-activities-list.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.activities.list',
  path: '/youtube/v3/activities',
  method: 'get',
  tag: 'activities',
};

export const YOUTUBE_ACTIVITIES_LIST_MOCK: MockEndpoint<YoutubeActivitiesListResponse> =
  {
    key: 'YOUTUBE_ACTIVITIES_LIST',
    baseUrl: YOUTUBE_BASE_URL,
    meta: _meta,
    provide: provideYoutubeActivitiesList,
  };

export function provideYoutubeActivitiesListMock(
  initialBehavior?: MockEndpointBehavior<YoutubeActivitiesListResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(YOUTUBE_ACTIVITIES_LIST_MOCK, initialBehavior);
}
