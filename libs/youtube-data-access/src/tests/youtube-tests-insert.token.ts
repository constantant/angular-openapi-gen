import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeTestsInsertBody = NonNullable<
  paths['/youtube/v3/tests']['post']['requestBody']
>['content']['application/json'];

export type YoutubeTestsInsertResponse =
  paths['/youtube/v3/tests']['post']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  properties: {
    featuredPart: {
      type: 'boolean',
    },
    gaia: {
      format: 'int64',
      type: 'string',
    },
    id: {
      type: 'string',
    },
    snippet: {
      properties: {},
      type: 'object',
    },
  },
  type: 'object',
};

function _validateResponse(value: unknown): YoutubeTestsInsertResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `YoutubeTestsInsert response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as YoutubeTestsInsertResponse;
}

export const YOUTUBE_TESTS_INSERT = new InjectionToken<
  (
    body: YoutubeTestsInsertBody | Signal<YoutubeTestsInsertBody>,
  ) => ReturnType<typeof httpResource<YoutubeTestsInsertResponse>>
>('YOUTUBE_TESTS_INSERT');

export function provideYoutubeTestsInsert(): FactoryProvider {
  return {
    provide: YOUTUBE_TESTS_INSERT,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (body: YoutubeTestsInsertBody | Signal<YoutubeTestsInsertBody>) =>
        httpResource<YoutubeTestsInsertResponse>(
          () => ({
            url: `${base}/youtube/v3/tests`,
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
