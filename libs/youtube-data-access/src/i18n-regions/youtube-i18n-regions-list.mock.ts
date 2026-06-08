import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { YOUTUBE_I18N_REGIONS_LIST } from './youtube-i18n-regions-list.token';
import type { YoutubeI18nRegionsListResponse } from './youtube-i18n-regions-list.token';

export function provideYoutubeI18nRegionsListMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeI18nRegionsListResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_I18N_REGIONS_LIST,
    'YOUTUBE_I18N_REGIONS_LIST',
    initialBehavior,
  );
}
