import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeMembershipsLevelsListParams =
  paths['/youtube/v3/membershipsLevels']['get']['parameters']['query'];

export type YoutubeMembershipsLevelsListResponse =
  paths['/youtube/v3/membershipsLevels']['get']['responses']['200']['content']['application/json'];

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
      description: 'A list of pricing levels offered by a creator to the fans.',
      items: {
        description:
          'A *membershipsLevel* resource represents an offer made by YouTube creators for their fans. Users can become members of the channel by joining one of the available levels. They will provide recurring monetary support and receives special benefits.',
        properties: {
          etag: {
            description: 'Etag of this resource.',
            type: 'string',
          },
          id: {
            description:
              'The ID that YouTube assigns to uniquely identify the memberships level.',
            type: 'string',
          },
          kind: {
            default: 'youtube#membershipsLevel',
            description:
              'Identifies what kind of resource this is. Value: the fixed string "youtube#membershipsLevelListResponse".',
            type: 'string',
          },
          snippet: {
            description:
              'The snippet object contains basic details about the level.',
            properties: {
              creatorChannelId: {
                description:
                  "The id of the channel that's offering channel memberships.",
                type: 'string',
              },
              levelDetails: {
                description: 'Details about the pricing level.',
                properties: {
                  displayName: {
                    description:
                      'The name that should be used when referring to this level.',
                    type: 'string',
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
      default: 'youtube#membershipsLevelListResponse',
      description:
        'Identifies what kind of resource this is. Value: the fixed string "youtube#membershipsLevelListResponse".',
      type: 'string',
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
): YoutubeMembershipsLevelsListResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `YoutubeMembershipsLevelsList response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as YoutubeMembershipsLevelsListResponse;
}

export const YOUTUBE_MEMBERSHIPS_LEVELS_LIST = new InjectionToken<
  (
    params?:
      | YoutubeMembershipsLevelsListParams
      | (() => YoutubeMembershipsLevelsListParams | undefined),
  ) => ReturnType<typeof httpResource<YoutubeMembershipsLevelsListResponse>>
>('YOUTUBE_MEMBERSHIPS_LEVELS_LIST');

export function provideYoutubeMembershipsLevelsList(): FactoryProvider {
  return {
    provide: YOUTUBE_MEMBERSHIPS_LEVELS_LIST,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        params?:
          | YoutubeMembershipsLevelsListParams
          | (() => YoutubeMembershipsLevelsListParams | undefined),
      ) =>
        httpResource<YoutubeMembershipsLevelsListResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/youtube/v3/membershipsLevels`,
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
