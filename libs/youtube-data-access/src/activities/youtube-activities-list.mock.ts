import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_ACTIVITIES_LIST } from './youtube-activities-list.token';
import type { YoutubeActivitiesListResponse } from './youtube-activities-list.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.activities.list',
  path: '/youtube/v3/activities',
  method: 'get',
  tag: 'activities',
};

export function provideYoutubeActivitiesListMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeActivitiesListResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_ACTIVITIES_LIST,
    'YOUTUBE_ACTIVITIES_LIST',
    initialBehavior,
    _meta,
  );
}
