import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, type Observable } from 'rxjs';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeAbuseReportsInsertParams =
  paths['/youtube/v3/abuseReports']['post']['parameters']['query'];

export type YoutubeAbuseReportsInsertBody = NonNullable<
  paths['/youtube/v3/abuseReports']['post']['requestBody']
>['content']['application/json'];

export type YoutubeAbuseReportsInsertResponse =
  paths['/youtube/v3/abuseReports']['post']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  properties: {
    abuseTypes: {
      items: {
        properties: {
          id: {
            type: 'string',
          },
        },
        type: 'object',
      },
      type: 'array',
    },
    description: {
      type: 'string',
    },
    relatedEntities: {
      items: {
        properties: {
          entity: {
            properties: {
              id: {
                type: 'string',
              },
              typeId: {
                type: 'string',
              },
              url: {
                type: 'string',
              },
            },
            type: 'object',
          },
        },
        type: 'object',
      },
      type: 'array',
    },
    subject: {
      properties: {
        id: {
          type: 'string',
        },
        typeId: {
          type: 'string',
        },
        url: {
          type: 'string',
        },
      },
      type: 'object',
    },
  },
  type: 'object',
};

function _validateResponse(value: unknown): YoutubeAbuseReportsInsertResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `YoutubeAbuseReportsInsert response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as YoutubeAbuseReportsInsertResponse;
}

export const YOUTUBE_ABUSE_REPORTS_INSERT = new InjectionToken<
  (
    body: YoutubeAbuseReportsInsertBody,
    params: YoutubeAbuseReportsInsertParams,
  ) => Observable<YoutubeAbuseReportsInsertResponse>
>('YOUTUBE_ABUSE_REPORTS_INSERT');

export function provideYoutubeAbuseReportsInsert(): FactoryProvider {
  return {
    provide: YOUTUBE_ABUSE_REPORTS_INSERT,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body: YoutubeAbuseReportsInsertBody,
        params: YoutubeAbuseReportsInsertParams,
      ) =>
        http
          .request<YoutubeAbuseReportsInsertResponse>(
            'POST',
            `${base}/youtube/v3/abuseReports`,
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
