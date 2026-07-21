import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubePlaylistsListParams =
  paths['/youtube/v3/playlists']['get']['parameters']['query'];

export type YoutubePlaylistsListResponse =
  paths['/youtube/v3/playlists']['get']['responses']['200']['content']['application/json'];

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
      description: 'A list of playlists that match the request criteria',
      items: {
        description:
          "A *playlist* resource represents a YouTube playlist. A playlist is a collection of videos that can be viewed sequentially and shared with other users. A playlist can contain up to 200 videos, and YouTube does not limit the number of playlists that each user creates. By default, playlists are publicly visible to other users, but playlists can be public or private. YouTube also uses playlists to identify special collections of videos for a channel, such as: - uploaded videos - favorite videos - positively rated (liked) videos - watch history - watch later To be more specific, these lists are associated with a channel, which is a collection of a person, group, or company's videos, playlists, and other YouTube information. You can retrieve the playlist IDs for each of these lists from the channel resource for a given channel. You can then use the playlistItems.list method to retrieve any of those lists. You can also add or remove items from those lists by calling the playlistItems.insert and playlistItems.delete methods.",
        properties: {
          contentDetails: {
            description:
              'The contentDetails object contains information like video count.',
            properties: {
              itemCount: {
                description: 'The number of videos in the playlist.',
                format: 'uint32',
                type: 'integer',
              },
            },
            type: 'object',
          },
          etag: {
            description: 'Etag of this resource.',
            type: 'string',
          },
          id: {
            description:
              'The ID that YouTube uses to uniquely identify the playlist.',
            type: 'string',
          },
          kind: {
            default: 'youtube#playlist',
            description:
              'Identifies what kind of resource this is. Value: the fixed string "youtube#playlist".',
            type: 'string',
          },
          localizations: {
            additionalProperties: {
              description: 'Playlist localization setting',
              properties: {
                description: {
                  description:
                    "The localized strings for playlist's description.",
                  type: 'string',
                },
                title: {
                  description: "The localized strings for playlist's title.",
                  type: 'string',
                },
              },
              type: 'object',
            },
            description: 'Localizations for different languages',
            type: 'object',
          },
          player: {
            description:
              'The player object contains information that you would use to play the playlist in an embedded player.',
            properties: {
              embedHtml: {
                description:
                  'An <iframe> tag that embeds a player that will play the playlist.',
                type: 'string',
              },
            },
            type: 'object',
          },
          snippet: {
            description:
              'The snippet object contains basic details about the playlist, such as its title and description.',
            properties: {
              channelId: {
                description:
                  'The ID that YouTube uses to uniquely identify the channel that published the playlist.',
                type: 'string',
              },
              channelTitle: {
                description:
                  'The channel title of the channel that the video belongs to.',
                type: 'string',
              },
              defaultLanguage: {
                description:
                  "The language of the playlist's default title and description.",
                type: 'string',
              },
              description: {
                description: "The playlist's description.",
                type: 'string',
              },
              localized: {
                description: 'Playlist localization setting',
                properties: {
                  description: {
                    description:
                      "The localized strings for playlist's description.",
                    type: 'string',
                  },
                  title: {
                    description: "The localized strings for playlist's title.",
                    type: 'string',
                  },
                },
                type: 'object',
              },
              publishedAt: {
                description: 'The date and time that the playlist was created.',
                format: 'date-time',
                type: 'string',
              },
              tags: {
                description: 'Keyword tags associated with the playlist.',
                items: {
                  type: 'string',
                },
                type: 'array',
              },
              thumbnailVideoId: {
                description:
                  'Note: if the playlist has a custom thumbnail, this field will not be populated. The video id selected by the user that will be used as the thumbnail of this playlist. This field defaults to the first publicly viewable video in the playlist, if: 1. The user has never selected a video to be the thumbnail of the playlist. 2. The user selects a video to be the thumbnail, and then removes that video from the playlist. 3. The user selects a non-owned video to be the thumbnail, but that video becomes private, or gets deleted.',
                type: 'string',
              },
              thumbnails: {
                description:
                  'A map of thumbnail images associated with the playlist. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail.',
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
                description: "The playlist's title.",
                type: 'string',
              },
            },
            type: 'object',
          },
          status: {
            description:
              'The status object contains status information for the playlist.',
            properties: {
              privacyStatus: {
                description: "The playlist's privacy status.",
                enum: ['public', 'unlisted', 'private'],
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
      default: 'youtube#playlistListResponse',
      description:
        'Identifies what kind of resource this is. Value: the fixed string "youtube#playlistListResponse".',
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

function _validateResponse(value: unknown): YoutubePlaylistsListResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `YoutubePlaylistsList response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as YoutubePlaylistsListResponse;
}

export const YOUTUBE_PLAYLISTS_LIST = new InjectionToken<
  (
    params?:
      | YoutubePlaylistsListParams
      | (() => YoutubePlaylistsListParams | undefined),
  ) => ReturnType<typeof httpResource<YoutubePlaylistsListResponse>>
>('YOUTUBE_PLAYLISTS_LIST');

export function provideYoutubePlaylistsList(): FactoryProvider {
  return {
    provide: YOUTUBE_PLAYLISTS_LIST,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        params?:
          | YoutubePlaylistsListParams
          | (() => YoutubePlaylistsListParams | undefined),
      ) =>
        httpResource<YoutubePlaylistsListResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/youtube/v3/playlists`,
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
