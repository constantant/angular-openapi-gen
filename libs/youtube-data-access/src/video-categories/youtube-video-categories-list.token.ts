import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeVideoCategoriesListParams =
  paths['/youtube/v3/videoCategories']['get']['parameters']['query'];

export type YoutubeVideoCategoriesListResponse =
  paths['/youtube/v3/videoCategories']['get']['responses']['200']['content']['application/json'];

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
        'A list of video categories that can be associated with YouTube videos. In this map, the video category ID is the map key, and its value is the corresponding videoCategory resource.',
      items: {
        description:
          'A *videoCategory* resource identifies a category that has been or could be associated with uploaded videos.',
        properties: {
          etag: {
            description: 'Etag of this resource.',
            type: 'string',
          },
          id: {
            description:
              'The ID that YouTube uses to uniquely identify the video category.',
            type: 'string',
          },
          kind: {
            default: 'youtube#videoCategory',
            description:
              'Identifies what kind of resource this is. Value: the fixed string "youtube#videoCategory".',
            type: 'string',
          },
          snippet: {
            description:
              'The snippet object contains basic details about the video category, including its title.',
            properties: {
              assignable: {
                type: 'boolean',
              },
              channelId: {
                default: 'UCBR8-60-B28hp2BmDPdntcQ',
                description:
                  'The YouTube channel that created the video category.',
                type: 'string',
              },
              title: {
                description: "The video category's title.",
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
      default: 'youtube#videoCategoryListResponse',
      description:
        'Identifies what kind of resource this is. Value: the fixed string "youtube#videoCategoryListResponse".',
      type: 'string',
    },
    nextPageToken: {
      description:
        'The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set.',
      type: 'string',
    },
    pageInfo: {
      description:
        'Paging details for lists of resources, including total number of items available and number of resources returned in a single page.',
      properties: {
        resultsPerPage: {
          description: 'The number of results included in the API response.',
          format: 'int32',
          type: 'integer',
        },
        totalResults: {
          description: 'The total number of results in the result set.',
          format: 'int32',
          type: 'integer',
        },
      },
      type: 'object',
    },
    prevPageToken: {
      description:
        'The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set.',
      type: 'string',
    },
    tokenPagination: {
      description: 'Stub token pagination template to suppress results.',
      properties: {},
      type: 'object',
    },
    visitorId: {
      description: 'The visitorId identifies the visitor.',
      type: 'string',
    },
  },
  type: 'object',
};

function _validateResponse(value: unknown): YoutubeVideoCategoriesListResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `YoutubeVideoCategoriesList response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as YoutubeVideoCategoriesListResponse;
}

export const YOUTUBE_VIDEO_CATEGORIES_LIST = new InjectionToken<
  (
    params?:
      | YoutubeVideoCategoriesListParams
      | (() => YoutubeVideoCategoriesListParams | undefined),
  ) => ReturnType<typeof httpResource<YoutubeVideoCategoriesListResponse>>
>('YOUTUBE_VIDEO_CATEGORIES_LIST');

export function provideYoutubeVideoCategoriesList(): FactoryProvider {
  return {
    provide: YOUTUBE_VIDEO_CATEGORIES_LIST,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        params?:
          | YoutubeVideoCategoriesListParams
          | (() => YoutubeVideoCategoriesListParams | undefined),
      ) =>
        httpResource<YoutubeVideoCategoriesListResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/youtube/v3/videoCategories`,
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
