import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeVideoAbuseReportReasonsListParams =
  paths['/youtube/v3/videoAbuseReportReasons']['get']['parameters']['query'];

export type YoutubeVideoAbuseReportReasonsListResponse =
  paths['/youtube/v3/videoAbuseReportReasons']['get']['responses']['200']['content']['application/json'];

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
        'A list of valid abuse reasons that are used with `video.ReportAbuse`.',
      items: {
        description:
          'A `__videoAbuseReportReason__` resource identifies a reason that a video could be reported as abusive. Video abuse report reasons are used with `video.ReportAbuse`.',
        properties: {
          etag: {
            description: 'Etag of this resource.',
            type: 'string',
          },
          id: {
            description: 'The ID of this abuse report reason.',
            type: 'string',
          },
          kind: {
            default: 'youtube#videoAbuseReportReason',
            description:
              'Identifies what kind of resource this is. Value: the fixed string `"youtube#videoAbuseReportReason"`.',
            type: 'string',
          },
          snippet: {
            description:
              'The `snippet` object contains basic details about the abuse report reason.',
            properties: {
              label: {
                description:
                  'The localized label belonging to this abuse report reason.',
                type: 'string',
              },
              secondaryReasons: {
                description:
                  'The secondary reasons associated with this reason, if any are available. (There might be 0 or more.)',
                items: {
                  properties: {
                    id: {
                      description:
                        'The ID of this abuse report secondary reason.',
                      type: 'string',
                    },
                    label: {
                      description:
                        'The localized label for this abuse report secondary reason.',
                      type: 'string',
                    },
                  },
                  type: 'object',
                },
                type: 'array',
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
      default: 'youtube#videoAbuseReportReasonListResponse',
      description:
        'Identifies what kind of resource this is. Value: the fixed string `"youtube#videoAbuseReportReasonListResponse"`.',
      type: 'string',
    },
    visitorId: {
      description: 'The `visitorId` identifies the visitor.',
      type: 'string',
    },
  },
  type: 'object',
};

function _validateResponse(
  value: unknown,
): YoutubeVideoAbuseReportReasonsListResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `YoutubeVideoAbuseReportReasonsList response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as YoutubeVideoAbuseReportReasonsListResponse;
}

export const YOUTUBE_VIDEO_ABUSE_REPORT_REASONS_LIST = new InjectionToken<
  (
    params?:
      | YoutubeVideoAbuseReportReasonsListParams
      | (() => YoutubeVideoAbuseReportReasonsListParams | undefined),
  ) => ReturnType<
    typeof httpResource<YoutubeVideoAbuseReportReasonsListResponse>
  >
>('YOUTUBE_VIDEO_ABUSE_REPORT_REASONS_LIST');

export function provideYoutubeVideoAbuseReportReasonsList(): FactoryProvider {
  return {
    provide: YOUTUBE_VIDEO_ABUSE_REPORT_REASONS_LIST,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        params?:
          | YoutubeVideoAbuseReportReasonsListParams
          | (() => YoutubeVideoAbuseReportReasonsListParams | undefined),
      ) =>
        httpResource<YoutubeVideoAbuseReportReasonsListResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/youtube/v3/videoAbuseReportReasons`,
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
