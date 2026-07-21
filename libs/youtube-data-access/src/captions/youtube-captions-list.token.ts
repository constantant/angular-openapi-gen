import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeCaptionsListParams =
  paths['/youtube/v3/captions']['get']['parameters']['query'];

export type YoutubeCaptionsListResponse =
  paths['/youtube/v3/captions']['get']['responses']['200']['content']['application/json'];

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
      description: 'A list of captions that match the request criteria.',
      items: {
        description:
          'A *caption* resource represents a YouTube caption track. A caption track is associated with exactly one YouTube video.',
        properties: {
          etag: {
            description: 'Etag of this resource.',
            type: 'string',
          },
          id: {
            description:
              'The ID that YouTube uses to uniquely identify the caption track.',
            type: 'string',
          },
          kind: {
            default: 'youtube#caption',
            description:
              'Identifies what kind of resource this is. Value: the fixed string "youtube#caption".',
            type: 'string',
          },
          snippet: {
            description:
              'The snippet object contains basic details about the caption.',
            properties: {
              audioTrackType: {
                description:
                  'The type of audio track associated with the caption track.',
                enum: ['unknown', 'primary', 'commentary', 'descriptive'],
                type: 'string',
              },
              failureReason: {
                description:
                  "The reason that YouTube failed to process the caption track. This property is only present if the state property's value is failed.",
                enum: [
                  'unknownFormat',
                  'unsupportedFormat',
                  'processingFailed',
                ],
                type: 'string',
              },
              isAutoSynced: {
                description:
                  'Indicates whether YouTube synchronized the caption track to the audio track in the video. The value will be true if a sync was explicitly requested when the caption track was uploaded. For example, when calling the captions.insert or captions.update methods, you can set the sync parameter to true to instruct YouTube to sync the uploaded track to the video. If the value is false, YouTube uses the time codes in the uploaded caption track to determine when to display captions.',
                type: 'boolean',
              },
              isCC: {
                description:
                  'Indicates whether the track contains closed captions for the deaf and hard of hearing. The default value is false.',
                type: 'boolean',
              },
              isDraft: {
                description:
                  'Indicates whether the caption track is a draft. If the value is true, then the track is not publicly visible. The default value is false. @mutable youtube.captions.insert youtube.captions.update',
                type: 'boolean',
              },
              isEasyReader: {
                description:
                  'Indicates whether caption track is formatted for "easy reader," meaning it is at a third-grade level for language learners. The default value is false.',
                type: 'boolean',
              },
              isLarge: {
                description:
                  'Indicates whether the caption track uses large text for the vision-impaired. The default value is false.',
                type: 'boolean',
              },
              language: {
                description:
                  'The language of the caption track. The property value is a BCP-47 language tag.',
                type: 'string',
              },
              lastUpdated: {
                description:
                  'The date and time when the caption track was last updated.',
                format: 'date-time',
                type: 'string',
              },
              name: {
                description:
                  'The name of the caption track. The name is intended to be visible to the user as an option during playback.',
                type: 'string',
              },
              status: {
                description: "The caption track's status.",
                enum: ['serving', 'syncing', 'failed'],
                type: 'string',
              },
              trackKind: {
                description: "The caption track's type.",
                enum: ['standard', 'ASR', 'forced'],
                type: 'string',
              },
              videoId: {
                description:
                  'The ID that YouTube uses to uniquely identify the video associated with the caption track. @mutable youtube.captions.insert',
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
    kind: {
      default: 'youtube#captionListResponse',
      description:
        'Identifies what kind of resource this is. Value: the fixed string "youtube#captionListResponse".',
      type: 'string',
    },
    visitorId: {
      description: 'The visitorId identifies the visitor.',
      type: 'string',
    },
  },
  type: 'object',
};

function _validateResponse(value: unknown): YoutubeCaptionsListResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `YoutubeCaptionsList response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as YoutubeCaptionsListResponse;
}

export const YOUTUBE_CAPTIONS_LIST = new InjectionToken<
  (
    params?:
      YoutubeCaptionsListParams | (() => YoutubeCaptionsListParams | undefined),
  ) => ReturnType<typeof httpResource<YoutubeCaptionsListResponse>>
>('YOUTUBE_CAPTIONS_LIST');

export function provideYoutubeCaptionsList(): FactoryProvider {
  return {
    provide: YOUTUBE_CAPTIONS_LIST,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        params?:
          | YoutubeCaptionsListParams
          | (() => YoutubeCaptionsListParams | undefined),
      ) =>
        httpResource<YoutubeCaptionsListResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/youtube/v3/captions`,
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
