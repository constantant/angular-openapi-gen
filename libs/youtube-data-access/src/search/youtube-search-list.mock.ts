import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_SEARCH_LIST } from './youtube-search-list.token';
import type { YoutubeSearchListResponse } from './youtube-search-list.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.search.list',
  path: '/youtube/v3/search',
  method: 'get',
  tag: 'search',
};

export function provideYoutubeSearchListMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeSearchListResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_SEARCH_LIST,
    'YOUTUBE_SEARCH_LIST',
    initialBehavior,
    _meta,
  );
}
