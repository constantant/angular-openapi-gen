import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeSuperChatEventsListParams =
  paths['/youtube/v3/superChatEvents']['get']['parameters']['query'];

export type YoutubeSuperChatEventsListResponse =
  paths['/youtube/v3/superChatEvents']['get']['responses']['200']['content']['application/json'];

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
        'A list of Super Chat purchases that match the request criteria.',
      items: {
        description:
          'A `__superChatEvent__` resource represents a Super Chat purchase on a YouTube channel.',
        properties: {
          etag: {
            description: 'Etag of this resource.',
            type: 'string',
          },
          id: {
            description:
              'The ID that YouTube assigns to uniquely identify the Super Chat event.',
            type: 'string',
          },
          kind: {
            default: 'youtube#superChatEvent',
            description:
              'Identifies what kind of resource this is. Value: the fixed string `"youtube#superChatEvent"`.',
            type: 'string',
          },
          snippet: {
            description:
              'The `snippet` object contains basic details about the Super Chat event.',
            properties: {
              amountMicros: {
                description:
                  'The purchase amount, in micros of the purchase currency. e.g., 1 is represented as 1000000.',
                format: 'uint64',
                type: 'string',
              },
              channelId: {
                description: 'Channel id where the event occurred.',
                type: 'string',
              },
              commentText: {
                description:
                  'The text contents of the comment left by the user.',
                type: 'string',
              },
              createdAt: {
                description: 'The date and time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              currency: {
                description:
                  'The currency in which the purchase was made. ISO 4217.',
                type: 'string',
              },
              displayString: {
                description:
                  'A rendered string that displays the purchase amount and currency (e.g., "$1.00"). The string is rendered for the given language.',
                type: 'string',
              },
              isSuperStickerEvent: {
                description: 'True if this event is a Super Sticker event.',
                type: 'boolean',
              },
              messageType: {
                description:
                  'The tier for the paid message, which is based on the amount of money spent to purchase the message.',
                format: 'uint32',
                type: 'integer',
              },
              superStickerMetadata: {
                description:
                  'If this event is a Super Sticker event, this field will contain metadata about the Super Sticker.',
                properties: {
                  altText: {
                    description:
                      'Internationalized alt text that describes the sticker image and any animation associated with it.',
                    type: 'string',
                  },
                  altTextLanguage: {
                    description:
                      'Specifies the localization language in which the alt text is returned.',
                    type: 'string',
                  },
                  stickerId: {
                    description:
                      'Unique identifier of the Super Sticker. This is a shorter form of the alt_text that includes pack name and a recognizable characteristic of the sticker.',
                    type: 'string',
                  },
                },
                type: 'object',
              },
              supporterDetails: {
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
                description: 'Details about the supporter.',
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
      default: 'youtube#superChatEventListResponse',
      description:
        'Identifies what kind of resource this is. Value: the fixed string "youtube#superChatEventListResponse".',
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

function _validateResponse(value: unknown): YoutubeSuperChatEventsListResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `YoutubeSuperChatEventsList response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as YoutubeSuperChatEventsListResponse;
}

export const YOUTUBE_SUPER_CHAT_EVENTS_LIST = new InjectionToken<
  (
    params?:
      | YoutubeSuperChatEventsListParams
      | (() => YoutubeSuperChatEventsListParams | undefined),
  ) => ReturnType<typeof httpResource<YoutubeSuperChatEventsListResponse>>
>('YOUTUBE_SUPER_CHAT_EVENTS_LIST');

export function provideYoutubeSuperChatEventsList(): FactoryProvider {
  return {
    provide: YOUTUBE_SUPER_CHAT_EVENTS_LIST,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        params?:
          | YoutubeSuperChatEventsListParams
          | (() => YoutubeSuperChatEventsListParams | undefined),
      ) =>
        httpResource<YoutubeSuperChatEventsListResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/youtube/v3/superChatEvents`,
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
