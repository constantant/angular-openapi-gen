import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_VIDEO_CATEGORIES_LIST } from './youtube-video-categories-list.token';
import type { YoutubeVideoCategoriesListResponse } from './youtube-video-categories-list.token';

export function provideYoutubeVideoCategoriesListMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeVideoCategoriesListResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_VIDEO_CATEGORIES_LIST,
    'YOUTUBE_VIDEO_CATEGORIES_LIST',
    initialBehavior,
  );
}
