import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeLiveBroadcastsInsertBody = NonNullable<
  paths['/youtube/v3/liveBroadcasts']['post']['requestBody']
>['content']['application/json'];

export type YoutubeLiveBroadcastsInsertResponse =
  paths['/youtube/v3/liveBroadcasts']['post']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  description:
    'A *liveBroadcast* resource represents an event that will be streamed, via live video, on YouTube.',
  properties: {
    contentDetails: {
      description:
        "The contentDetails object contains information about the event's video content, such as whether the content can be shown in an embedded video player or if it will be archived and therefore available for viewing after the event has concluded.",
      properties: {
        boundStreamId: {
          description:
            'This value uniquely identifies the live stream bound to the broadcast.',
          type: 'string',
        },
        boundStreamLastUpdateTimeMs: {
          description:
            'The date and time that the live stream referenced by boundStreamId was last updated.',
          format: 'date-time',
          type: 'string',
        },
        closedCaptionsType: {
          enum: [
            'closedCaptionsTypeUnspecified',
            'closedCaptionsDisabled',
            'closedCaptionsHttpPost',
            'closedCaptionsEmbedded',
          ],
          type: 'string',
        },
        enableAutoStart: {
          description:
            'This setting indicates whether auto start is enabled for this broadcast. The default value for this property is false. This setting can only be used by Events.',
          type: 'boolean',
        },
        enableAutoStop: {
          description:
            'This setting indicates whether auto stop is enabled for this broadcast. The default value for this property is false. This setting can only be used by Events.',
          type: 'boolean',
        },
        enableClosedCaptions: {
          description:
            'This setting indicates whether HTTP POST closed captioning is enabled for this broadcast. The ingestion URL of the closed captions is returned through the liveStreams API. This is mutually exclusive with using the closed_captions_type property, and is equivalent to setting closed_captions_type to CLOSED_CAPTIONS_HTTP_POST.',
          type: 'boolean',
        },
        enableContentEncryption: {
          description:
            'This setting indicates whether YouTube should enable content encryption for the broadcast.',
          type: 'boolean',
        },
        enableDvr: {
          description:
            "This setting determines whether viewers can access DVR controls while watching the video. DVR controls enable the viewer to control the video playback experience by pausing, rewinding, or fast forwarding content. The default value for this property is true. *Important:* You must set the value to true and also set the enableArchive property's value to true if you want to make playback available immediately after the broadcast ends.",
          type: 'boolean',
        },
        enableEmbed: {
          description:
            'This setting indicates whether the broadcast video can be played in an embedded player. If you choose to archive the video (using the enableArchive property), this setting will also apply to the archived video.',
          type: 'boolean',
        },
        enableLowLatency: {
          description:
            'Indicates whether this broadcast has low latency enabled.',
          type: 'boolean',
        },
        latencyPreference: {
          description:
            'If both this and enable_low_latency are set, they must match. LATENCY_NORMAL should match enable_low_latency=false LATENCY_LOW should match enable_low_latency=true LATENCY_ULTRA_LOW should have enable_low_latency omitted.',
          enum: ['latencyPreferenceUnspecified', 'normal', 'low', 'ultraLow'],
          type: 'string',
        },
        mesh: {
          description:
            'The mesh for projecting the video if projection is mesh. The mesh value must be a UTF-8 string containing the base-64 encoding of 3D mesh data that follows the Spherical Video V2 RFC specification for an mshp box, excluding the box size and type but including the following four reserved zero bytes for the version and flags.',
          format: 'byte',
          type: 'string',
        },
        monitorStream: {
          description:
            'The monitorStream object contains information about the monitor stream, which the broadcaster can use to review the event content before the broadcast stream is shown publicly.',
          properties: {
            broadcastStreamDelayMs: {
              description:
                'If you have set the enableMonitorStream property to true, then this property determines the length of the live broadcast delay.',
              format: 'uint32',
              type: 'integer',
            },
            embedHtml: {
              description:
                'HTML code that embeds a player that plays the monitor stream.',
              type: 'string',
            },
            enableMonitorStream: {
              description:
                "This value determines whether the monitor stream is enabled for the broadcast. If the monitor stream is enabled, then YouTube will broadcast the event content on a special stream intended only for the broadcaster's consumption. The broadcaster can use the stream to review the event content and also to identify the optimal times to insert cuepoints. You need to set this value to true if you intend to have a broadcast delay for your event. *Note:* This property cannot be updated once the broadcast is in the testing or live state.",
              type: 'boolean',
            },
          },
          type: 'object',
        },
        projection: {
          description:
            'The projection format of this broadcast. This defaults to rectangular.',
          enum: ['projectionUnspecified', 'rectangular', '360', 'mesh'],
          type: 'string',
        },
        recordFromStart: {
          description:
            "Automatically start recording after the event goes live. The default value for this property is true. *Important:* You must also set the enableDvr property's value to true if you want the playback to be available immediately after the broadcast ends. If you set this property's value to true but do not also set the enableDvr property to true, there may be a delay of around one day before the archived video will be available for playback.",
          type: 'boolean',
        },
        startWithSlate: {
          description:
            "This setting indicates whether the broadcast should automatically begin with an in-stream slate when you update the broadcast's status to live. After updating the status, you then need to send a liveCuepoints.insert request that sets the cuepoint's eventState to end to remove the in-stream slate and make your broadcast stream visible to viewers.",
          type: 'boolean',
        },
        stereoLayout: {
          description:
            'The 3D stereo layout of this broadcast. This defaults to mono.',
          enum: ['stereoLayoutUnspecified', 'mono', 'leftRight', 'topBottom'],
          type: 'string',
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
        'The ID that YouTube assigns to uniquely identify the broadcast.',
      type: 'string',
    },
    kind: {
      default: 'youtube#liveBroadcast',
      description:
        'Identifies what kind of resource this is. Value: the fixed string "youtube#liveBroadcast".',
      type: 'string',
    },
    snippet: {
      description:
        'The snippet object contains basic details about the event, including its title, description, start time, and end time.',
      properties: {
        actualEndTime: {
          description:
            "The date and time that the broadcast actually ended. This information is only available once the broadcast's state is complete.",
          format: 'date-time',
          type: 'string',
        },
        actualStartTime: {
          description:
            "The date and time that the broadcast actually started. This information is only available once the broadcast's state is live.",
          format: 'date-time',
          type: 'string',
        },
        channelId: {
          description:
            'The ID that YouTube uses to uniquely identify the channel that is publishing the broadcast.',
          type: 'string',
        },
        description: {
          description:
            "The broadcast's description. As with the title, you can set this field by modifying the broadcast resource or by setting the description field of the corresponding video resource.",
          type: 'string',
        },
        isDefaultBroadcast: {
          description:
            'Indicates whether this broadcast is the default broadcast. Internal only.',
          type: 'boolean',
        },
        liveChatId: {
          description: 'The id of the live chat for this broadcast.',
          type: 'string',
        },
        publishedAt: {
          description:
            "The date and time that the broadcast was added to YouTube's live broadcast schedule.",
          format: 'date-time',
          type: 'string',
        },
        scheduledEndTime: {
          description:
            'The date and time that the broadcast is scheduled to end.',
          format: 'date-time',
          type: 'string',
        },
        scheduledStartTime: {
          description:
            'The date and time that the broadcast is scheduled to start.',
          format: 'date-time',
          type: 'string',
        },
        thumbnails: {
          description:
            'A map of thumbnail images associated with the broadcast. For each nested object in this object, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail.',
          properties: {
            high: {
              description: 'The high quality image for this resource.',
              properties: {
                height: {
                  description: '(Optional) Height of the thumbnail image.',
                  format: 'uint32',
                  type: 'integer',
                },
                url: {
                  description: "The thumbnail image's URL.",
                  type: 'string',
                },
                width: {
                  description: '(Optional) Width of the thumbnail image.',
                  format: 'uint32',
                  type: 'integer',
                },
              },
              type: 'object',
            },
            maxres: {
              description:
                'The maximum resolution quality image for this resource.',
              properties: {
                height: {
                  description: '(Optional) Height of the thumbnail image.',
                  format: 'uint32',
                  type: 'integer',
                },
                url: {
                  description: "The thumbnail image's URL.",
                  type: 'string',
                },
                width: {
                  description: '(Optional) Width of the thumbnail image.',
                  format: 'uint32',
                  type: 'integer',
                },
              },
              type: 'object',
            },
            medium: {
              description: 'The medium quality image for this resource.',
              properties: {
                height: {
                  description: '(Optional) Height of the thumbnail image.',
                  format: 'uint32',
                  type: 'integer',
                },
                url: {
                  description: "The thumbnail image's URL.",
                  type: 'string',
                },
                width: {
                  description: '(Optional) Width of the thumbnail image.',
                  format: 'uint32',
                  type: 'integer',
                },
              },
              type: 'object',
            },
            standard: {
              description: 'The standard quality image for this resource.',
              properties: {
                height: {
                  description: '(Optional) Height of the thumbnail image.',
                  format: 'uint32',
                  type: 'integer',
                },
                url: {
                  description: "The thumbnail image's URL.",
                  type: 'string',
                },
                width: {
                  description: '(Optional) Width of the thumbnail image.',
                  format: 'uint32',
                  type: 'integer',
                },
              },
              type: 'object',
            },
          },
          type: 'object',
        },
        title: {
          description:
            "The broadcast's title. Note that the broadcast represents exactly one YouTube video. You can set this field by modifying the broadcast resource or by setting the title field of the corresponding video resource.",
          type: 'string',
        },
      },
      type: 'object',
    },
    statistics: {
      description:
        "The statistics object contains info about the event's current stats. These include concurrent viewers and total chat count. Statistics can change (in either direction) during the lifetime of an event. Statistics are only returned while the event is live.",
      properties: {
        concurrentViewers: {
          description:
            'The number of viewers currently watching the broadcast. The property and its value will be present if the broadcast has current viewers and the broadcast owner has not hidden the viewcount for the video. Note that YouTube stops tracking the number of concurrent viewers for a broadcast when the broadcast ends. So, this property would not identify the number of viewers watching an archived video of a live broadcast that already ended.',
          format: 'uint64',
          type: 'string',
        },
      },
      type: 'object',
    },
    status: {
      description:
        "The status object contains information about the event's status.",
      properties: {
        lifeCycleStatus: {
          description:
            "The broadcast's status. The status can be updated using the API's liveBroadcasts.transition method.",
          enum: [
            'lifeCycleStatusUnspecified',
            'created',
            'ready',
            'testing',
            'live',
            'complete',
            'revoked',
            'testStarting',
            'liveStarting',
          ],
          type: 'string',
        },
        liveBroadcastPriority: {
          description: 'Priority of the live broadcast event (internal state).',
          enum: ['liveBroadcastPriorityUnspecified', 'low', 'normal', 'high'],
          type: 'string',
        },
        madeForKids: {
          description:
            'Whether the broadcast is made for kids or not, decided by YouTube instead of the creator. This field is read only.',
          type: 'boolean',
        },
        privacyStatus: {
          description:
            "The broadcast's privacy status. Note that the broadcast represents exactly one YouTube video, so the privacy settings are identical to those supported for videos. In addition, you can set this field by modifying the broadcast resource or by setting the privacyStatus field of the corresponding video resource.",
          enum: ['public', 'unlisted', 'private'],
          type: 'string',
        },
        recordingStatus: {
          description: "The broadcast's recording status.",
          enum: [
            'liveBroadcastRecordingStatusUnspecified',
            'notRecording',
            'recording',
            'recorded',
          ],
          type: 'string',
        },
        selfDeclaredMadeForKids: {
          description:
            'This field will be set to True if the creator declares the broadcast to be kids only: go/live-cw-work.',
          type: 'boolean',
        },
      },
      type: 'object',
    },
  },
  type: 'object',
};

function _validateResponse(
  value: unknown,
): YoutubeLiveBroadcastsInsertResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `YoutubeLiveBroadcastsInsert response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as YoutubeLiveBroadcastsInsertResponse;
}

export const YOUTUBE_LIVE_BROADCASTS_INSERT = new InjectionToken<
  (
    body:
      YoutubeLiveBroadcastsInsertBody | Signal<YoutubeLiveBroadcastsInsertBody>,
  ) => ReturnType<typeof httpResource<YoutubeLiveBroadcastsInsertResponse>>
>('YOUTUBE_LIVE_BROADCASTS_INSERT');

export function provideYoutubeLiveBroadcastsInsert(): FactoryProvider {
  return {
    provide: YOUTUBE_LIVE_BROADCASTS_INSERT,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body:
          | YoutubeLiveBroadcastsInsertBody
          | Signal<YoutubeLiveBroadcastsInsertBody>,
      ) =>
        httpResource<YoutubeLiveBroadcastsInsertResponse>(
          () => ({
            url: `${base}/youtube/v3/liveBroadcasts`,
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
