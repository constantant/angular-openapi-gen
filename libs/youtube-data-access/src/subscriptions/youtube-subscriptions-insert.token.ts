import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeSubscriptionsInsertBody = NonNullable<
  paths['/youtube/v3/subscriptions']['post']['requestBody']
>['content']['application/json'];

export type YoutubeSubscriptionsInsertResponse =
  paths['/youtube/v3/subscriptions']['post']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  description:
    'A *subscription* resource contains information about a YouTube user subscription. A subscription notifies a user when new videos are added to a channel or when another user takes one of several actions on YouTube, such as uploading a video, rating a video, or commenting on a video.',
  properties: {
    contentDetails: {
      description:
        'The contentDetails object contains basic statistics about the subscription.',
      properties: {
        activityType: {
          description:
            'The type of activity this subscription is for (only uploads, everything).',
          enum: ['subscriptionActivityTypeUnspecified', 'all', 'uploads'],
          type: 'string',
        },
        newItemCount: {
          description:
            'The number of new items in the subscription since its content was last read.',
          format: 'uint32',
          type: 'integer',
        },
        totalItemCount: {
          description:
            'The approximate number of items that the subscription points to.',
          format: 'uint32',
          type: 'integer',
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
        'The ID that YouTube uses to uniquely identify the subscription.',
      type: 'string',
    },
    kind: {
      default: 'youtube#subscription',
      description:
        'Identifies what kind of resource this is. Value: the fixed string "youtube#subscription".',
      type: 'string',
    },
    snippet: {
      description:
        'The snippet object contains basic details about the subscription, including its title and the channel that the user subscribed to.',
      properties: {
        channelId: {
          description:
            "The ID that YouTube uses to uniquely identify the subscriber's channel.",
          type: 'string',
        },
        channelTitle: {
          description:
            'Channel title for the channel that the subscription belongs to.',
          type: 'string',
        },
        description: {
          description: "The subscription's details.",
          type: 'string',
        },
        publishedAt: {
          description: 'The date and time that the subscription was created.',
          format: 'date-time',
          type: 'string',
        },
        resourceId: {
          description:
            'The id object contains information about the channel that the user subscribed to.',
          properties: {
            channelId: {
              description:
                'The ID that YouTube uses to uniquely identify the referred resource, if that resource is a channel. This property is only present if the resourceId.kind value is youtube#channel.',
              type: 'string',
            },
            kind: {
              description: 'The type of the API resource.',
              type: 'string',
            },
            playlistId: {
              description:
                'The ID that YouTube uses to uniquely identify the referred resource, if that resource is a playlist. This property is only present if the resourceId.kind value is youtube#playlist.',
              type: 'string',
            },
            videoId: {
              description:
                'The ID that YouTube uses to uniquely identify the referred resource, if that resource is a video. This property is only present if the resourceId.kind value is youtube#video.',
              type: 'string',
            },
          },
          type: 'object',
        },
        thumbnails: {
          description:
            'A map of thumbnail images associated with the video. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail.',
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
          description: "The subscription's title.",
          type: 'string',
        },
      },
      type: 'object',
    },
    subscriberSnippet: {
      description:
        'The subscriberSnippet object contains basic details about the subscriber.',
      properties: {
        channelId: {
          description: 'The channel ID of the subscriber.',
          type: 'string',
        },
        description: {
          description: 'The description of the subscriber.',
          type: 'string',
        },
        thumbnails: {
          description: 'Thumbnails for this subscriber.',
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
          description: 'The title of the subscriber.',
          type: 'string',
        },
      },
      type: 'object',
    },
  },
  type: 'object',
};

function _validateResponse(value: unknown): YoutubeSubscriptionsInsertResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `YoutubeSubscriptionsInsert response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as YoutubeSubscriptionsInsertResponse;
}

export const YOUTUBE_SUBSCRIPTIONS_INSERT = new InjectionToken<
  (
    body:
      YoutubeSubscriptionsInsertBody | Signal<YoutubeSubscriptionsInsertBody>,
  ) => ReturnType<typeof httpResource<YoutubeSubscriptionsInsertResponse>>
>('YOUTUBE_SUBSCRIPTIONS_INSERT');

export function provideYoutubeSubscriptionsInsert(): FactoryProvider {
  return {
    provide: YOUTUBE_SUBSCRIPTIONS_INSERT,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body:
          | YoutubeSubscriptionsInsertBody
          | Signal<YoutubeSubscriptionsInsertBody>,
      ) =>
        httpResource<YoutubeSubscriptionsInsertResponse>(
          () => ({
            url: `${base}/youtube/v3/subscriptions`,
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
