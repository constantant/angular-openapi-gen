import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, type Observable } from 'rxjs';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeTestsInsertParams =
  paths['/youtube/v3/tests']['post']['parameters']['query'];

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
    body: YoutubeTestsInsertBody,
    params: YoutubeTestsInsertParams,
  ) => Observable<YoutubeTestsInsertResponse>
>('YOUTUBE_TESTS_INSERT');

export function provideYoutubeTestsInsert(): FactoryProvider {
  return {
    provide: YOUTUBE_TESTS_INSERT,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (body: YoutubeTestsInsertBody, params: YoutubeTestsInsertParams) =>
        http
          .request<YoutubeTestsInsertResponse>(
            'POST',
            `${base}/youtube/v3/tests`,
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
