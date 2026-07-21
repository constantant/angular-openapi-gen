import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeLiveChatModeratorsListParams =
  paths['/youtube/v3/liveChat/moderators']['get']['parameters']['query'];

export type YoutubeLiveChatModeratorsListResponse =
  paths['/youtube/v3/liveChat/moderators']['get']['responses']['200']['content']['application/json'];

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
      description: 'A list of moderators that match the request criteria.',
      items: {
        description:
          'A *liveChatModerator* resource represents a moderator for a YouTube live chat. A chat moderator has the ability to ban/unban users from a chat, remove message, etc.',
        properties: {
          etag: {
            description: 'Etag of this resource.',
            type: 'string',
          },
          id: {
            description:
              'The ID that YouTube assigns to uniquely identify the moderator.',
            type: 'string',
          },
          kind: {
            default: 'youtube#liveChatModerator',
            description:
              'Identifies what kind of resource this is. Value: the fixed string "youtube#liveChatModerator".',
            type: 'string',
          },
          snippet: {
            description:
              'The snippet object contains basic details about the moderator.',
            properties: {
              liveChatId: {
                description:
                  'The ID of the live chat this moderator can act on.',
                type: 'string',
              },
              moderatorDetails: {
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
                description: 'Details about the moderator.',
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
      default: 'youtube#liveChatModeratorListResponse',
      description:
        'Identifies what kind of resource this is. Value: the fixed string "youtube#liveChatModeratorListResponse".',
      type: 'string',
    },
    nextPageToken: {
      description:
        'The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set.',
      type: 'string',
    },
    pageInfo: {
      description: 'General pagination information.',
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

function _validateResponse(
  value: unknown,
): YoutubeLiveChatModeratorsListResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `YoutubeLiveChatModeratorsList response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as YoutubeLiveChatModeratorsListResponse;
}

export const YOUTUBE_LIVE_CHAT_MODERATORS_LIST = new InjectionToken<
  (
    params?:
      | YoutubeLiveChatModeratorsListParams
      | (() => YoutubeLiveChatModeratorsListParams | undefined),
  ) => ReturnType<typeof httpResource<YoutubeLiveChatModeratorsListResponse>>
>('YOUTUBE_LIVE_CHAT_MODERATORS_LIST');

export function provideYoutubeLiveChatModeratorsList(): FactoryProvider {
  return {
    provide: YOUTUBE_LIVE_CHAT_MODERATORS_LIST,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        params?:
          | YoutubeLiveChatModeratorsListParams
          | (() => YoutubeLiveChatModeratorsListParams | undefined),
      ) =>
        httpResource<YoutubeLiveChatModeratorsListResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/youtube/v3/liveChat/moderators`,
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
