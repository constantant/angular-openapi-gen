import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeMembersListParams =
  paths['/youtube/v3/members']['get']['parameters']['query'];

export type YoutubeMembersListResponse =
  paths['/youtube/v3/members']['get']['responses']['200']['content']['application/json'];

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
      description: 'A list of members that match the request criteria.',
      items: {
        description:
          'A *member* resource represents a member for a YouTube channel. A member provides recurring monetary support to a creator and receives special benefits.',
        properties: {
          etag: {
            description: 'Etag of this resource.',
            type: 'string',
          },
          kind: {
            default: 'youtube#member',
            description:
              'Identifies what kind of resource this is. Value: the fixed string "youtube#member".',
            type: 'string',
          },
          snippet: {
            description:
              'The snippet object contains basic details about the member.',
            properties: {
              creatorChannelId: {
                description:
                  "The id of the channel that's offering memberships.",
                type: 'string',
              },
              memberDetails: {
                properties: {
                  channelId: {
                    description: 'The YouTube channel ID.',
                    type: 'string',
                  },
                  channelUrl: {
                    description: "The channel's URL.",
                    type: 'string',
                  },
                  displayName: {
                    description: "The channel's display name.",
                    type: 'string',
                  },
                  profileImageUrl: {
                    description: "The channels's avatar URL.",
                    type: 'string',
                  },
                },
                type: 'object',
                description: 'Details about the member.',
              },
              membershipsDetails: {
                description: "Details about the user's membership.",
                properties: {
                  accessibleLevels: {
                    description:
                      'Ids of all levels that the user has access to. This includes the currently active level and all other levels that are included because of a higher purchase.',
                    items: {
                      type: 'string',
                    },
                    type: 'array',
                  },
                  highestAccessibleLevel: {
                    description:
                      'Id of the highest level that the user has access to at the moment.',
                    type: 'string',
                  },
                  highestAccessibleLevelDisplayName: {
                    description:
                      'Display name for the highest level that the user has access to at the moment.',
                    type: 'string',
                  },
                  membershipsDuration: {
                    description:
                      'Data about memberships duration without taking into consideration pricing levels.',
                    properties: {
                      memberSince: {
                        description:
                          'The date and time when the user became a continuous member across all levels.',
                        type: 'string',
                      },
                      memberTotalDurationMonths: {
                        description:
                          'The cumulative time the user has been a member across all levels in complete months (the time is rounded down to the nearest integer).',
                        format: 'int32',
                        type: 'integer',
                      },
                    },
                    type: 'object',
                  },
                  membershipsDurationAtLevels: {
                    description:
                      'Data about memberships duration on particular pricing levels.',
                    items: {
                      properties: {
                        level: {
                          description: 'Pricing level ID.',
                          type: 'string',
                        },
                        memberSince: {
                          description:
                            'The date and time when the user became a continuous member for the given level.',
                          type: 'string',
                        },
                        memberTotalDurationMonths: {
                          description:
                            'The cumulative time the user has been a member for the given level in complete months (the time is rounded down to the nearest integer).',
                          format: 'int32',
                          type: 'integer',
                        },
                      },
                      type: 'object',
                    },
                    type: 'array',
                  },
                },
                type: 'object',
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
      default: 'youtube#memberListResponse',
      description:
        'Identifies what kind of resource this is. Value: the fixed string "youtube#memberListResponse".',
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

function _validateResponse(value: unknown): YoutubeMembersListResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `YoutubeMembersList response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as YoutubeMembersListResponse;
}

export const YOUTUBE_MEMBERS_LIST = new InjectionToken<
  (
    params?:
      YoutubeMembersListParams | (() => YoutubeMembersListParams | undefined),
  ) => ReturnType<typeof httpResource<YoutubeMembersListResponse>>
>('YOUTUBE_MEMBERS_LIST');

export function provideYoutubeMembersList(): FactoryProvider {
  return {
    provide: YOUTUBE_MEMBERS_LIST,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        params?:
          | YoutubeMembersListParams
          | (() => YoutubeMembersListParams | undefined),
      ) =>
        httpResource<YoutubeMembersListResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/youtube/v3/members`,
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
