import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeSearchListParams =
  paths['/youtube/v3/search']['get']['parameters']['query'];

export type YoutubeSearchListResponse =
  paths['/youtube/v3/search']['get']['responses']['200']['content']['application/json'];

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
      description: 'Pagination information for token pagination.',
      items: {
        description:
          'A search result contains information about a YouTube video, channel, or playlist that matches the search parameters specified in an API request. While a search result points to a uniquely identifiable resource, like a video, it does not have its own persistent data.',
        properties: {
          etag: {
            description: 'Etag of this resource.',
            type: 'string',
          },
          id: {
            description:
              'The id object contains information that can be used to uniquely identify the resource that matches the search request.',
            properties: {
              channelId: {
                description:
                  'The ID that YouTube uses to uniquely identify the referred resource, if that resource is a channel. This property is only present if the resourceId.kind value is youtube#channel.',
                type: 'string',
              },
              kind: {
                description: 'The type of the API resource.',
                type: 'string',
              },
              playlistId: {
                description:
                  'The ID that YouTube uses to uniquely identify the referred resource, if that resource is a playlist. This property is only present if the resourceId.kind value is youtube#playlist.',
                type: 'string',
              },
              videoId: {
                description:
                  'The ID that YouTube uses to uniquely identify the referred resource, if that resource is a video. This property is only present if the resourceId.kind value is youtube#video.',
                type: 'string',
              },
            },
            type: 'object',
          },
          kind: {
            default: 'youtube#searchResult',
            description:
              'Identifies what kind of resource this is. Value: the fixed string "youtube#searchResult".',
            type: 'string',
          },
          snippet: {
            description:
              "The snippet object contains basic details about a search result, such as its title or description. For example, if the search result is a video, then the title will be the video's title and the description will be the video's description.",
            properties: {
              channelId: {
                description:
                  'The value that YouTube uses to uniquely identify the channel that published the resource that the search result identifies.',
                type: 'string',
              },
              channelTitle: {
                description:
                  'The title of the channel that published the resource that the search result identifies.',
                type: 'string',
              },
              description: {
                description: 'A description of the search result.',
                type: 'string',
              },
              liveBroadcastContent: {
                description:
                  'It indicates if the resource (video or channel) has upcoming/active live broadcast content. Or it\'s "none" if there is not any upcoming/active live broadcasts.',
                enum: ['none', 'upcoming', 'live', 'completed'],
                type: 'string',
              },
              publishedAt: {
                description:
                  'The creation date and time of the resource that the search result identifies.',
                format: 'date-time',
                type: 'string',
              },
              thumbnails: {
                description:
                  'A map of thumbnail images associated with the search result. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail.',
                properties: {
                  high: {
                    description: 'The high quality image for this resource.',
                    properties: {
                      height: {
                        description:
                          '(Optional) Height of the thumbnail image.',
                        format: 'uint32',
                        type: 'integer',
                      },
                      url: {
                        description: "The thumbnail image's URL.",
                        type: 'string',
                      },
                      width: {
                        description: '(Optional) Width of the thumbnail image.',
                        format: 'uint32',
                        type: 'integer',
                      },
                    },
                    type: 'object',
                  },
                  maxres: {
                    description:
                      'The maximum resolution quality image for this resource.',
                    properties: {
                      height: {
                        description:
                          '(Optional) Height of the thumbnail image.',
                        format: 'uint32',
                        type: 'integer',
                      },
                      url: {
                        description: "The thumbnail image's URL.",
                        type: 'string',
                      },
                      width: {
                        description: '(Optional) Width of the thumbnail image.',
                        format: 'uint32',
                        type: 'integer',
                      },
                    },
                    type: 'object',
                  },
                  medium: {
                    description: 'The medium quality image for this resource.',
                    properties: {
                      height: {
                        description:
                          '(Optional) Height of the thumbnail image.',
                        format: 'uint32',
                        type: 'integer',
                      },
                      url: {
                        description: "The thumbnail image's URL.",
                        type: 'string',
                      },
                      width: {
                        description: '(Optional) Width of the thumbnail image.',
                        format: 'uint32',
                        type: 'integer',
                      },
                    },
                    type: 'object',
                  },
                  standard: {
                    description:
                      'The standard quality image for this resource.',
                    properties: {
                      height: {
                        description:
                          '(Optional) Height of the thumbnail image.',
                        format: 'uint32',
                        type: 'integer',
                      },
                      url: {
                        description: "The thumbnail image's URL.",
                        type: 'string',
                      },
                      width: {
                        description: '(Optional) Width of the thumbnail image.',
                        format: 'uint32',
                        type: 'integer',
                      },
                    },
                    type: 'object',
                  },
                },
                type: 'object',
              },
              title: {
                description: 'The title of the search result.',
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
      default: 'youtube#searchListResponse',
      description:
        'Identifies what kind of resource this is. Value: the fixed string "youtube#searchListResponse".',
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
    regionCode: {
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

function _validateResponse(value: unknown): YoutubeSearchListResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `YoutubeSearchList response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as YoutubeSearchListResponse;
}

export const YOUTUBE_SEARCH_LIST = new InjectionToken<
  (
    params?:
      YoutubeSearchListParams | (() => YoutubeSearchListParams | undefined),
  ) => ReturnType<typeof httpResource<YoutubeSearchListResponse>>
>('YOUTUBE_SEARCH_LIST');

export function provideYoutubeSearchList(): FactoryProvider {
  return {
    provide: YOUTUBE_SEARCH_LIST,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        params?:
          YoutubeSearchListParams | (() => YoutubeSearchListParams | undefined),
      ) =>
        httpResource<YoutubeSearchListResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/youtube/v3/search`,
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
