import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeLiveChatModeratorsInsertBody = NonNullable<
  paths['/youtube/v3/liveChat/moderators']['post']['requestBody']
>['content']['application/json'];

export type YoutubeLiveChatModeratorsInsertResponse =
  paths['/youtube/v3/liveChat/moderators']['post']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
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
          description: 'The ID of the live chat this moderator can act on.',
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
};

function _validateResponse(
  value: unknown,
): YoutubeLiveChatModeratorsInsertResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `YoutubeLiveChatModeratorsInsert response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as YoutubeLiveChatModeratorsInsertResponse;
}

export const YOUTUBE_LIVE_CHAT_MODERATORS_INSERT = new InjectionToken<
  (
    body:
      | YoutubeLiveChatModeratorsInsertBody
      | Signal<YoutubeLiveChatModeratorsInsertBody>,
  ) => ReturnType<typeof httpResource<YoutubeLiveChatModeratorsInsertResponse>>
>('YOUTUBE_LIVE_CHAT_MODERATORS_INSERT');

export function provideYoutubeLiveChatModeratorsInsert(): FactoryProvider {
  return {
    provide: YOUTUBE_LIVE_CHAT_MODERATORS_INSERT,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body:
          | YoutubeLiveChatModeratorsInsertBody
          | Signal<YoutubeLiveChatModeratorsInsertBody>,
      ) =>
        httpResource<YoutubeLiveChatModeratorsInsertResponse>(
          () => ({
            url: `${base}/youtube/v3/liveChat/moderators`,
            method: 'POST',
            body,
            headers: {
              ...(oauth2?.() != null
                ? { Authorization: `Bearer ${oauth2()}` }
                : {}),
              ...(oauth2c?.() != null
                ? { Authorization: `Bearer ${oauth2c()}` }
                : {}),
            },
          }),
          { parse: _validateResponse },
        );
    },
  };
}
