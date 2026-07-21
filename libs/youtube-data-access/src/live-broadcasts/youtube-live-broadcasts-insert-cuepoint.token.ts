import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeLiveBroadcastsInsertCuepointBody = NonNullable<
  paths['/youtube/v3/liveBroadcasts/cuepoint']['post']['requestBody']
>['content']['application/json'];

export type YoutubeLiveBroadcastsInsertCuepointResponse =
  paths['/youtube/v3/liveBroadcasts/cuepoint']['post']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  description:
    'Note that there may be a 5-second end-point resolution issue. For instance, if a cuepoint comes in for 22:03:27, we may stuff the cuepoint into 22:03:25 or 22:03:30, depending. This is an artifact of HLS.',
  properties: {
    cueType: {
      enum: ['cueTypeUnspecified', 'cueTypeAd'],
      type: 'string',
    },
    durationSecs: {
      description: 'The duration of this cuepoint.',
      format: 'uint32',
      type: 'integer',
    },
    etag: {
      type: 'string',
    },
    id: {
      description: 'The identifier for cuepoint resource.',
      type: 'string',
    },
    insertionOffsetTimeMs: {
      description:
        'The time when the cuepoint should be inserted by offset to the broadcast actual start time.',
      format: 'int64',
      type: 'string',
    },
    walltimeMs: {
      description:
        'The wall clock time at which the cuepoint should be inserted. Only one of insertion_offset_time_ms and walltime_ms may be set at a time.',
      format: 'uint64',
      type: 'string',
    },
  },
  type: 'object',
};

function _validateResponse(
  value: unknown,
): YoutubeLiveBroadcastsInsertCuepointResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `YoutubeLiveBroadcastsInsertCuepoint response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as YoutubeLiveBroadcastsInsertCuepointResponse;
}

export const YOUTUBE_LIVE_BROADCASTS_INSERT_CUEPOINT = new InjectionToken<
  (
    body:
      | YoutubeLiveBroadcastsInsertCuepointBody
      | Signal<YoutubeLiveBroadcastsInsertCuepointBody>,
  ) => ReturnType<
    typeof httpResource<YoutubeLiveBroadcastsInsertCuepointResponse>
  >
>('YOUTUBE_LIVE_BROADCASTS_INSERT_CUEPOINT');

export function provideYoutubeLiveBroadcastsInsertCuepoint(): FactoryProvider {
  return {
    provide: YOUTUBE_LIVE_BROADCASTS_INSERT_CUEPOINT,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body:
          | YoutubeLiveBroadcastsInsertCuepointBody
          | Signal<YoutubeLiveBroadcastsInsertCuepointBody>,
      ) =>
        httpResource<YoutubeLiveBroadcastsInsertCuepointResponse>(
          () => ({
            url: `${base}/youtube/v3/liveBroadcasts/cuepoint`,
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
