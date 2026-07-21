import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeI18nRegionsListParams =
  paths['/youtube/v3/i18nRegions']['get']['parameters']['query'];

export type YoutubeI18nRegionsListResponse =
  paths['/youtube/v3/i18nRegions']['get']['responses']['200']['content']['application/json'];

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
        'A list of regions where YouTube is available. In this map, the i18n region ID is the map key, and its value is the corresponding i18nRegion resource.',
      items: {
        description:
          'A *i18nRegion* resource identifies a region where YouTube is available.',
        properties: {
          etag: {
            description: 'Etag of this resource.',
            type: 'string',
          },
          id: {
            description:
              'The ID that YouTube uses to uniquely identify the i18n region.',
            type: 'string',
          },
          kind: {
            default: 'youtube#i18nRegion',
            description:
              'Identifies what kind of resource this is. Value: the fixed string "youtube#i18nRegion".',
            type: 'string',
          },
          snippet: {
            description:
              'The snippet object contains basic details about the i18n region, such as region code and human-readable name.',
            properties: {
              gl: {
                description: 'The region code as a 2-letter ISO country code.',
                type: 'string',
              },
              name: {
                description: 'The human-readable name of the region.',
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
      default: 'youtube#i18nRegionListResponse',
      description:
        'Identifies what kind of resource this is. Value: the fixed string "youtube#i18nRegionListResponse".',
      type: 'string',
    },
    visitorId: {
      description: 'The visitorId identifies the visitor.',
      type: 'string',
    },
  },
  type: 'object',
};

function _validateResponse(value: unknown): YoutubeI18nRegionsListResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `YoutubeI18nRegionsList response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as YoutubeI18nRegionsListResponse;
}

export const YOUTUBE_I18N_REGIONS_LIST = new InjectionToken<
  (
    params?:
      | YoutubeI18nRegionsListParams
      | (() => YoutubeI18nRegionsListParams | undefined),
  ) => ReturnType<typeof httpResource<YoutubeI18nRegionsListResponse>>
>('YOUTUBE_I18N_REGIONS_LIST');

export function provideYoutubeI18nRegionsList(): FactoryProvider {
  return {
    provide: YOUTUBE_I18N_REGIONS_LIST,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        params?:
          | YoutubeI18nRegionsListParams
          | (() => YoutubeI18nRegionsListParams | undefined),
      ) =>
        httpResource<YoutubeI18nRegionsListResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/youtube/v3/i18nRegions`,
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
