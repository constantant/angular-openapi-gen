import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_I18N_LANGUAGES_LIST } from './youtube-i18n-languages-list.token';
import type { YoutubeI18nLanguagesListResponse } from './youtube-i18n-languages-list.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.i18nLanguages.list',
  path: '/youtube/v3/i18nLanguages',
  method: 'get',
  tag: 'i18n-languages',
};

export function provideYoutubeI18nLanguagesListMock(
  initialBehavior?: ProviderInitialBehavior<YoutubeI18nLanguagesListResponse>,
): FactoryProvider {
  return provideMockResource(
    YOUTUBE_I18N_LANGUAGES_LIST,
    'YOUTUBE_I18N_LANGUAGES_LIST',
    initialBehavior,
    _meta,
  );
}
