import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeVideosGetRatingParams =
  paths['/youtube/v3/videos/getRating']['get']['parameters']['query'];

export type YoutubeVideosGetRatingResponse =
  paths['/youtube/v3/videos/getRating']['get']['responses']['200']['content']['application/json'];

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
      description: 'A list of ratings that match the request criteria.',
      items: {
        description: 'Basic details about rating of a video.',
        properties: {
          rating: {
            description: 'Rating of a video.',
            enum: ['none', 'like', 'dislike'],
            type: 'string',
          },
          videoId: {
            description:
              'The ID that YouTube uses to uniquely identify the video.',
            type: 'string',
          },
        },
        type: 'object',
      },
      type: 'array',
    },
    kind: {
      default: 'youtube#videoGetRatingResponse',
      description:
        'Identifies what kind of resource this is. Value: the fixed string "youtube#videoGetRatingResponse".',
      type: 'string',
    },
    visitorId: {
      description: 'The visitorId identifies the visitor.',
      type: 'string',
    },
  },
  type: 'object',
};

function _validateResponse(value: unknown): YoutubeVideosGetRatingResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `YoutubeVideosGetRating response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as YoutubeVideosGetRatingResponse;
}

export const YOUTUBE_VIDEOS_GET_RATING = new InjectionToken<
  (
    params?:
      | YoutubeVideosGetRatingParams
      | (() => YoutubeVideosGetRatingParams | undefined),
  ) => ReturnType<typeof httpResource<YoutubeVideosGetRatingResponse>>
>('YOUTUBE_VIDEOS_GET_RATING');

export function provideYoutubeVideosGetRating(): FactoryProvider {
  return {
    provide: YOUTUBE_VIDEOS_GET_RATING,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        params?:
          | YoutubeVideosGetRatingParams
          | (() => YoutubeVideosGetRatingParams | undefined),
      ) =>
        httpResource<YoutubeVideosGetRatingResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/youtube/v3/videos/getRating`,
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
