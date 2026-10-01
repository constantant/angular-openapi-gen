import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, type Observable } from 'rxjs';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeLiveChatBansInsertParams =
  paths['/youtube/v3/liveChat/bans']['post']['parameters']['query'];

export type YoutubeLiveChatBansInsertBody = NonNullable<
  paths['/youtube/v3/liveChat/bans']['post']['requestBody']
>['content']['application/json'];

export type YoutubeLiveChatBansInsertResponse =
  paths['/youtube/v3/liveChat/bans']['post']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  description:
    'A `__liveChatBan__` resource represents a ban for a YouTube live chat.',
  properties: {
    etag: {
      description: 'Etag of this resource.',
      type: 'string',
    },
    id: {
      description: 'The ID that YouTube assigns to uniquely identify the ban.',
      type: 'string',
    },
    kind: {
      default: 'youtube#liveChatBan',
      description:
        'Identifies what kind of resource this is. Value: the fixed string `"youtube#liveChatBan"`.',
      type: 'string',
    },
    snippet: {
      description: 'The `snippet` object contains basic details about the ban.',
      properties: {
        banDurationSeconds: {
          description:
            'The duration of a ban, only filled if the ban has type TEMPORARY.',
          format: 'uint64',
          type: 'string',
        },
        bannedUserDetails: {
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
        },
        liveChatId: {
          description: 'The chat this ban is pertinent to.',
          type: 'string',
        },
        type: {
          description: 'The type of ban.',
          enum: ['liveChatBanTypeUnspecified', 'permanent', 'temporary'],
          type: 'string',
        },
      },
      type: 'object',
    },
  },
  type: 'object',
};

function _validateResponse(value: unknown): YoutubeLiveChatBansInsertResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `YoutubeLiveChatBansInsert response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as YoutubeLiveChatBansInsertResponse;
}

export const YOUTUBE_LIVE_CHAT_BANS_INSERT = new InjectionToken<
  (
    body: YoutubeLiveChatBansInsertBody,
    params: YoutubeLiveChatBansInsertParams,
  ) => Observable<YoutubeLiveChatBansInsertResponse>
>('YOUTUBE_LIVE_CHAT_BANS_INSERT');

export function provideYoutubeLiveChatBansInsert(): FactoryProvider {
  return {
    provide: YOUTUBE_LIVE_CHAT_BANS_INSERT,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body: YoutubeLiveChatBansInsertBody,
        params: YoutubeLiveChatBansInsertParams,
      ) =>
        http
          .request<YoutubeLiveChatBansInsertResponse>(
            'POST',
            `${base}/youtube/v3/liveChat/bans`,
            {
              params: params as unknown as Record<
                string,
                | string
                | number
                | boolean
                | readonly (string | number | boolean)[]
              >,
              body,
              headers: {
                ...(oauth2?.() != null
                  ? { Authorization: `Bearer ${oauth2()}` }
                  : {}),
                ...(oauth2c?.() != null
                  ? { Authorization: `Bearer ${oauth2c()}` }
                  : {}),
              },
            },
          )
          .pipe(map(_validateResponse));
    },
  };
}
