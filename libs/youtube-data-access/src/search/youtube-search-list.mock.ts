import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_SEARCH_LIST } from './youtube-search-list.token';
import type { YoutubeSearchListResponse } from './youtube-search-list.token';

export function provideYoutubeSearchListMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeSearchListResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_SEARCH_LIST,
    'YOUTUBE_SEARCH_LIST',
    initialBehavior,
  );
}
