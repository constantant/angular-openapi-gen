import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import {
  provideYoutubeI18nLanguagesList,
  type YoutubeI18nLanguagesListResponse,
} from './youtube-i18n-languages-list.token';

const _meta: MockResourceMeta = {
  specId: 'youtube',
  operationId: 'youtube.i18nLanguages.list',
  path: '/youtube/v3/i18nLanguages',
  method: 'get',
  tag: 'i18n-languages',
};

export const YOUTUBE_I18N_LANGUAGES_LIST_MOCK: MockEndpoint<YoutubeI18nLanguagesListResponse> =
  {
    key: 'YOUTUBE_I18N_LANGUAGES_LIST',
    baseUrl: YOUTUBE_BASE_URL,
    meta: _meta,
    provide: provideYoutubeI18nLanguagesList,
  };

export function provideYoutubeI18nLanguagesListMock(
  initialBehavior?: MockEndpointBehavior<YoutubeI18nLanguagesListResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(YOUTUBE_I18N_LANGUAGES_LIST_MOCK, initialBehavior);
}
