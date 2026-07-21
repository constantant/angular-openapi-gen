import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeLiveStreamsListParams =
  paths['/youtube/v3/liveStreams']['get']['parameters']['query'];

export type YoutubeLiveStreamsListResponse =
  paths['/youtube/v3/liveStreams']['get']['responses']['200']['content']['application/json'];

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
      description: 'A list of live streams that match the request criteria.',
      items: {
        description: 'A live stream describes a live ingestion point.',
        properties: {
          cdn: {
            description:
              "The cdn object defines the live stream's content delivery network (CDN) settings. These settings provide details about the manner in which you stream your content to YouTube.",
            properties: {
              format: {
                description:
                  'The format of the video stream that you are sending to Youtube. ',
                type: 'string',
              },
              frameRate: {
                description: 'The frame rate of the inbound video data.',
                enum: ['30fps', '60fps', 'variable'],
                type: 'string',
              },
              ingestionInfo: {
                description:
                  'The ingestionInfo object contains information that YouTube provides that you need to transmit your RTMP or HTTP stream to YouTube.',
                properties: {
                  backupIngestionAddress: {
                    description:
                      'The backup ingestion URL that you should use to stream video to YouTube. You have the option of simultaneously streaming the content that you are sending to the ingestionAddress to this URL.',
                    type: 'string',
                  },
                  ingestionAddress: {
                    description:
                      'The primary ingestion URL that you should use to stream video to YouTube. You must stream video to this URL. Depending on which application or tool you use to encode your video stream, you may need to enter the stream URL and stream name separately or you may need to concatenate them in the following format: *STREAM_URL/STREAM_NAME* ',
                    type: 'string',
                  },
                  rtmpsBackupIngestionAddress: {
                    description:
                      'This ingestion url may be used instead of backupIngestionAddress in order to stream via RTMPS. Not applicable to non-RTMP streams.',
                    type: 'string',
                  },
                  rtmpsIngestionAddress: {
                    description:
                      'This ingestion url may be used instead of ingestionAddress in order to stream via RTMPS. Not applicable to non-RTMP streams.',
                    type: 'string',
                  },
                  streamName: {
                    description:
                      'The stream name that YouTube assigns to the video stream.',
                    type: 'string',
                  },
                },
                type: 'object',
              },
              ingestionType: {
                description:
                  ' The method or protocol used to transmit the video stream.',
                enum: ['rtmp', 'dash', 'webrtc', 'hls'],
                type: 'string',
              },
              resolution: {
                description: 'The resolution of the inbound video data.',
                enum: [
                  '240p',
                  '360p',
                  '480p',
                  '720p',
                  '1080p',
                  '1440p',
                  '2160p',
                  'variable',
                ],
                type: 'string',
              },
            },
            type: 'object',
          },
          contentDetails: {
            description:
              'The content_details object contains information about the stream, including the closed captions ingestion URL.',
            properties: {
              closedCaptionsIngestionUrl: {
                description:
                  'The ingestion URL where the closed captions of this stream are sent.',
                type: 'string',
              },
              isReusable: {
                description:
                  'Indicates whether the stream is reusable, which means that it can be bound to multiple broadcasts. It is common for broadcasters to reuse the same stream for many different broadcasts if those broadcasts occur at different times. If you set this value to false, then the stream will not be reusable, which means that it can only be bound to one broadcast. Non-reusable streams differ from reusable streams in the following ways: - A non-reusable stream can only be bound to one broadcast. - A non-reusable stream might be deleted by an automated process after the broadcast ends. - The liveStreams.list method does not list non-reusable streams if you call the method and set the mine parameter to true. The only way to use that method to retrieve the resource for a non-reusable stream is to use the id parameter to identify the stream. ',
                type: 'boolean',
              },
            },
            type: 'object',
          },
          etag: {
            description: 'Etag of this resource.',
            type: 'string',
          },
          id: {
            description:
              'The ID that YouTube assigns to uniquely identify the stream.',
            type: 'string',
          },
          kind: {
            default: 'youtube#liveStream',
            description:
              'Identifies what kind of resource this is. Value: the fixed string "youtube#liveStream".',
            type: 'string',
          },
          snippet: {
            description:
              'The snippet object contains basic details about the stream, including its channel, title, and description.',
            properties: {
              channelId: {
                description:
                  'The ID that YouTube uses to uniquely identify the channel that is transmitting the stream.',
                type: 'string',
              },
              description: {
                description:
                  "The stream's description. The value cannot be longer than 10000 characters.",
                type: 'string',
              },
              isDefaultStream: {
                type: 'boolean',
              },
              publishedAt: {
                description: 'The date and time that the stream was created.',
                format: 'date-time',
                type: 'string',
              },
              title: {
                description:
                  "The stream's title. The value must be between 1 and 128 characters long.",
                type: 'string',
              },
            },
            type: 'object',
          },
          status: {
            description:
              "The status object contains information about live stream's status.",
            properties: {
              healthStatus: {
                description: 'The health status of the stream.',
                properties: {
                  configurationIssues: {
                    description: 'The configurations issues on this stream',
                    items: {
                      properties: {
                        description: {
                          description:
                            'The long-form description of the issue and how to resolve it.',
                          type: 'string',
                        },
                        reason: {
                          description: 'The short-form reason for this issue.',
                          type: 'string',
                        },
                        severity: {
                          description:
                            'How severe this issue is to the stream.',
                          enum: ['info', 'warning', 'error'],
                          type: 'string',
                        },
                        type: {
                          description: 'The kind of error happening.',
                          enum: [
                            'gopSizeOver',
                            'gopSizeLong',
                            'gopSizeShort',
                            'openGop',
                            'badContainer',
                            'audioBitrateHigh',
                            'audioBitrateLow',
                            'audioSampleRate',
                            'bitrateHigh',
                            'bitrateLow',
                            'audioCodec',
                            'videoCodec',
                            'noAudioStream',
                            'noVideoStream',
                            'multipleVideoStreams',
                            'multipleAudioStreams',
                            'audioTooManyChannels',
                            'interlacedVideo',
                            'frameRateHigh',
                            'resolutionMismatch',
                            'videoCodecMismatch',
                            'videoInterlaceMismatch',
                            'videoProfileMismatch',
                            'videoBitrateMismatch',
                            'framerateMismatch',
                            'gopMismatch',
                            'audioSampleRateMismatch',
                            'audioStereoMismatch',
                            'audioCodecMismatch',
                            'audioBitrateMismatch',
                            'videoResolutionSuboptimal',
                            'videoResolutionUnsupported',
                            'videoIngestionStarved',
                            'videoIngestionFasterThanRealtime',
                          ],
                          type: 'string',
                        },
                      },
                      type: 'object',
                    },
                    type: 'array',
                  },
                  lastUpdateTimeSeconds: {
                    description:
                      'The last time this status was updated (in seconds)',
                    format: 'uint64',
                    type: 'string',
                  },
                  status: {
                    description: 'The status code of this stream',
                    enum: ['good', 'ok', 'bad', 'noData', 'revoked'],
                    type: 'string',
                  },
                },
                type: 'object',
              },
              streamStatus: {
                enum: ['created', 'ready', 'active', 'inactive', 'error'],
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
      default: 'youtube#liveStreamListResponse',
      description:
        'Identifies what kind of resource this is. Value: the fixed string "youtube#liveStreamListResponse".',
      type: 'string',
    },
    nextPageToken: {
      description:
        'The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set.',
      type: 'string',
    },
    pageInfo: {
      description:
        'Paging details for lists of resources, including total number of items available and number of resources returned in a single page.',
      properties: {
        resultsPerPage: {
          description: 'The number of results included in the API response.',
          format: 'int32',
          type: 'integer',
        },
        totalResults: {
          description: 'The total number of results in the result set.',
          format: 'int32',
          type: 'integer',
        },
      },
      type: 'object',
    },
    prevPageToken: {
      description:
        'The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set.',
      type: 'string',
    },
    tokenPagination: {
      description: 'Stub token pagination template to suppress results.',
      properties: {},
      type: 'object',
    },
    visitorId: {
      description: 'The visitorId identifies the visitor.',
      type: 'string',
    },
  },
  type: 'object',
};

function _validateResponse(value: unknown): YoutubeLiveStreamsListResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `YoutubeLiveStreamsList response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as YoutubeLiveStreamsListResponse;
}

export const YOUTUBE_LIVE_STREAMS_LIST = new InjectionToken<
  (
    params?:
      | YoutubeLiveStreamsListParams
      | (() => YoutubeLiveStreamsListParams | undefined),
  ) => ReturnType<typeof httpResource<YoutubeLiveStreamsListResponse>>
>('YOUTUBE_LIVE_STREAMS_LIST');

export function provideYoutubeLiveStreamsList(): FactoryProvider {
  return {
    provide: YOUTUBE_LIVE_STREAMS_LIST,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        params?:
          | YoutubeLiveStreamsListParams
          | (() => YoutubeLiveStreamsListParams | undefined),
      ) =>
        httpResource<YoutubeLiveStreamsListResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/youtube/v3/liveStreams`,
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
