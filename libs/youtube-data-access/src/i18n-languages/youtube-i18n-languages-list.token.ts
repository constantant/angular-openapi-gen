import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeI18nLanguagesListParams =
  paths['/youtube/v3/i18nLanguages']['get']['parameters']['query'];

export type YoutubeI18nLanguagesListResponse =
  paths['/youtube/v3/i18nLanguages']['get']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  properties: {
    etag: {
      description: 'Etag of this resource.',
      type: 'string',
    },
    eventId: {
      description:
        'Serialized EventId of the request which produced this response.',
      type: 'string',
    },
    items: {
      description:
        'A list of supported i18n languages. In this map, the i18n language ID is the map key, and its value is the corresponding i18nLanguage resource.',
      items: {
        description:
          'An *i18nLanguage* resource identifies a UI language currently supported by YouTube.',
        properties: {
          etag: {
            description: 'Etag of this resource.',
            type: 'string',
          },
          id: {
            description:
              'The ID that YouTube uses to uniquely identify the i18n language.',
            type: 'string',
          },
          kind: {
            default: 'youtube#i18nLanguage',
            description:
              'Identifies what kind of resource this is. Value: the fixed string "youtube#i18nLanguage".',
            type: 'string',
          },
          snippet: {
            description:
              'The snippet object contains basic details about the i18n language, such as language code and human-readable name.',
            properties: {
              hl: {
                description:
                  'A short BCP-47 code that uniquely identifies a language.',
                type: 'string',
              },
              name: {
                description:
                  'The human-readable name of the language in the language itself.',
                type: 'string',
              },
            },
            type: 'object',
          },
        },
        type: 'object',
      },
      type: 'array',
    },
    kind: {
      default: 'youtube#i18nLanguageListResponse',
      description:
        'Identifies what kind of resource this is. Value: the fixed string "youtube#i18nLanguageListResponse".',
      type: 'string',
    },
    visitorId: {
      description: 'The visitorId identifies the visitor.',
      type: 'string',
    },
  },
  type: 'object',
};

function _validateResponse(value: unknown): YoutubeI18nLanguagesListResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `YoutubeI18nLanguagesList response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as YoutubeI18nLanguagesListResponse;
}

export const YOUTUBE_I18N_LANGUAGES_LIST = new InjectionToken<
  (
    params?:
      | YoutubeI18nLanguagesListParams
      | (() => YoutubeI18nLanguagesListParams | undefined),
  ) => ReturnType<typeof httpResource<YoutubeI18nLanguagesListResponse>>
>('YOUTUBE_I18N_LANGUAGES_LIST');

export function provideYoutubeI18nLanguagesList(): FactoryProvider {
  return {
    provide: YOUTUBE_I18N_LANGUAGES_LIST,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        params?:
          | YoutubeI18nLanguagesListParams
          | (() => YoutubeI18nLanguagesListParams | undefined),
      ) =>
        httpResource<YoutubeI18nLanguagesListResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/youtube/v3/i18nLanguages`,
              params: _params as unknown as Record<
                string,
                | string
                | number
                | boolean
                | readonly (string | number | boolean)[]
              >,
              headers: {
                ...(oauth2?.() != null
                  ? { Authorization: `Bearer ${oauth2()}` }
                  : {}),
                ...(oauth2c?.() != null
                  ? { Authorization: `Bearer ${oauth2c()}` }
                  : {}),
              },
            };
          },
          { parse: _validateResponse },
        );
    },
  };
}
