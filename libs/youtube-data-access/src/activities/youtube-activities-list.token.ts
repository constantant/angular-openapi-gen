import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeActivitiesListParams =
  paths['/youtube/v3/activities']['get']['parameters']['query'];

export type YoutubeActivitiesListResponse =
  paths['/youtube/v3/activities']['get']['responses']['200']['content']['application/json'];

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
      items: {
        description:
          'An *activity* resource contains information about an action that a particular channel, or user, has taken on YouTube.The actions reported in activity feeds include rating a video, sharing a video, marking a video as a favorite, commenting on a video, uploading a video, and so forth. Each activity resource identifies the type of action, the channel associated with the action, and the resource(s) associated with the action, such as the video that was rated or uploaded.',
        properties: {
          contentDetails: {
            description:
              "The contentDetails object contains information about the content associated with the activity. For example, if the snippet.type value is videoRated, then the contentDetails object's content identifies the rated video.",
            properties: {
              bulletin: {
                description:
                  'The bulletin object contains details about a channel bulletin post. This object is only present if the snippet.type is bulletin.',
                properties: {
                  resourceId: {
                    description:
                      'The resourceId object contains information that identifies the resource associated with a bulletin post. @mutable youtube.activities.insert',
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
                },
                type: 'object',
              },
              channelItem: {
                description:
                  'The channelItem object contains details about a resource which was added to a channel. This property is only present if the snippet.type is channelItem.',
                properties: {
                  resourceId: {
                    description:
                      'The resourceId object contains information that identifies the resource that was added to the channel.',
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
                },
                type: 'object',
              },
              comment: {
                description:
                  'The comment object contains information about a resource that received a comment. This property is only present if the snippet.type is comment.',
                properties: {
                  resourceId: {
                    description:
                      'The resourceId object contains information that identifies the resource associated with the comment.',
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
                },
                type: 'object',
              },
              favorite: {
                description:
                  'The favorite object contains information about a video that was marked as a favorite video. This property is only present if the snippet.type is favorite.',
                properties: {
                  resourceId: {
                    description:
                      'The resourceId object contains information that identifies the resource that was marked as a favorite.',
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
                },
                type: 'object',
              },
              like: {
                description:
                  'The like object contains information about a resource that received a positive (like) rating. This property is only present if the snippet.type is like.',
                properties: {
                  resourceId: {
                    description:
                      'The resourceId object contains information that identifies the rated resource.',
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
                },
                type: 'object',
              },
              playlistItem: {
                description:
                  'The playlistItem object contains information about a new playlist item. This property is only present if the snippet.type is playlistItem.',
                properties: {
                  playlistId: {
                    description:
                      'The value that YouTube uses to uniquely identify the playlist.',
                    type: 'string',
                  },
                  playlistItemId: {
                    description: 'ID of the item within the playlist.',
                    type: 'string',
                  },
                  resourceId: {
                    description:
                      'The resourceId object contains information about the resource that was added to the playlist.',
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
                },
                type: 'object',
              },
              promotedItem: {
                description:
                  'The promotedItem object contains details about a resource which is being promoted. This property is only present if the snippet.type is promotedItem.',
                properties: {
                  adTag: {
                    description:
                      'The URL the client should fetch to request a promoted item.',
                    type: 'string',
                  },
                  clickTrackingUrl: {
                    description:
                      'The URL the client should ping to indicate that the user clicked through on this promoted item.',
                    type: 'string',
                  },
                  creativeViewUrl: {
                    description:
                      'The URL the client should ping to indicate that the user was shown this promoted item.',
                    type: 'string',
                  },
                  ctaType: {
                    description:
                      'The type of call-to-action, a message to the user indicating action that can be taken.',
                    enum: ['ctaTypeUnspecified', 'visitAdvertiserSite'],
                    type: 'string',
                  },
                  customCtaButtonText: {
                    description:
                      'The custom call-to-action button text. If specified, it will override the default button text for the cta_type.',
                    type: 'string',
                  },
                  descriptionText: {
                    description:
                      'The text description to accompany the promoted item.',
                    type: 'string',
                  },
                  destinationUrl: {
                    description:
                      "The URL the client should direct the user to, if the user chooses to visit the advertiser's website.",
                    type: 'string',
                  },
                  forecastingUrl: {
                    description:
                      'The list of forecasting URLs. The client should ping all of these URLs when a promoted item is not available, to indicate that a promoted item could have been shown.',
                    items: {
                      type: 'string',
                    },
                    type: 'array',
                  },
                  impressionUrl: {
                    description:
                      'The list of impression URLs. The client should ping all of these URLs to indicate that the user was shown this promoted item.',
                    items: {
                      type: 'string',
                    },
                    type: 'array',
                  },
                  videoId: {
                    description:
                      'The ID that YouTube uses to uniquely identify the promoted video.',
                    type: 'string',
                  },
                },
                type: 'object',
              },
              recommendation: {
                description:
                  'The recommendation object contains information about a recommended resource. This property is only present if the snippet.type is recommendation.',
                properties: {
                  reason: {
                    description:
                      'The reason that the resource is recommended to the user.',
                    enum: [
                      'reasonUnspecified',
                      'videoFavorited',
                      'videoLiked',
                      'videoWatched',
                    ],
                    type: 'string',
                  },
                  resourceId: {
                    description:
                      'The resourceId object contains information that identifies the recommended resource.',
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
                  seedResourceId: {
                    description:
                      'The seedResourceId object contains information about the resource that caused the recommendation.',
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
                },
                type: 'object',
              },
              social: {
                description:
                  'The social object contains details about a social network post. This property is only present if the snippet.type is social.',
                properties: {
                  author: {
                    description: 'The author of the social network post.',
                    type: 'string',
                  },
                  imageUrl: {
                    description: "An image of the post's author.",
                    type: 'string',
                  },
                  referenceUrl: {
                    description: 'The URL of the social network post.',
                    type: 'string',
                  },
                  resourceId: {
                    description:
                      'The resourceId object encapsulates information that identifies the resource associated with a social network post.',
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
                  type: {
                    description: 'The name of the social network.',
                    enum: ['unspecified', 'googlePlus', 'facebook', 'twitter'],
                    type: 'string',
                  },
                },
                type: 'object',
              },
              subscription: {
                description:
                  'The subscription object contains information about a channel that a user subscribed to. This property is only present if the snippet.type is subscription.',
                properties: {
                  resourceId: {
                    description:
                      'The resourceId object contains information that identifies the resource that the user subscribed to.',
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
                },
                type: 'object',
              },
              upload: {
                description:
                  'The upload object contains information about the uploaded video. This property is only present if the snippet.type is upload.',
                properties: {
                  videoId: {
                    description:
                      'The ID that YouTube uses to uniquely identify the uploaded video.',
                    type: 'string',
                  },
                },
                type: 'object',
              },
            },
            type: 'object',
          },
          etag: {
            description: 'Etag of this resource',
            type: 'string',
          },
          id: {
            description:
              'The ID that YouTube uses to uniquely identify the activity.',
            type: 'string',
          },
          kind: {
            default: 'youtube#activity',
            description:
              'Identifies what kind of resource this is. Value: the fixed string "youtube#activity".',
            type: 'string',
          },
          snippet: {
            description:
              "The snippet object contains basic details about the activity, including the activity's type and group ID.",
            properties: {
              channelId: {
                description:
                  'The ID that YouTube uses to uniquely identify the channel associated with the activity.',
                type: 'string',
              },
              channelTitle: {
                description:
                  'Channel title for the channel responsible for this activity',
                type: 'string',
              },
              description: {
                description:
                  'The description of the resource primarily associated with the activity. @mutable youtube.activities.insert',
                type: 'string',
              },
              groupId: {
                description:
                  "The group ID associated with the activity. A group ID identifies user events that are associated with the same user and resource. For example, if a user rates a video and marks the same video as a favorite, the entries for those events would have the same group ID in the user's activity feed. In your user interface, you can avoid repetition by grouping events with the same groupId value.",
                type: 'string',
              },
              publishedAt: {
                description: 'The date and time that the video was uploaded.',
                format: 'date-time',
                type: 'string',
              },
              thumbnails: {
                description:
                  'A map of thumbnail images associated with the resource that is primarily associated with the activity. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail.',
                properties: {
                  high: {
                    description: 'The high quality image for this resource.',
                    properties: {
                      height: {
                        description:
                          '(Optional) Height of the thumbnail image.',
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
                        description:
                          '(Optional) Height of the thumbnail image.',
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
                        description:
                          '(Optional) Height of the thumbnail image.',
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
                    description:
                      'The standard quality image for this resource.',
                    properties: {
                      height: {
                        description:
                          '(Optional) Height of the thumbnail image.',
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
                  'The title of the resource primarily associated with the activity.',
                type: 'string',
              },
              type: {
                description:
                  'The type of activity that the resource describes.',
                enum: [
                  'typeUnspecified',
                  'upload',
                  'like',
                  'favorite',
                  'comment',
                  'subscription',
                  'playlistItem',
                  'recommendation',
                  'bulletin',
                  'social',
                  'channelItem',
                  'promotedItem',
                ],
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
      default: 'youtube#activityListResponse',
      description:
        'Identifies what kind of resource this is. Value: the fixed string "youtube#activityListResponse".',
      type: 'string',
    },
    nextPageToken: {
      description:
        'The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set.',
      type: 'string',
    },
    pageInfo: {
      description: 'General pagination information.',
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

function _validateResponse(value: unknown): YoutubeActivitiesListResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `YoutubeActivitiesList response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as YoutubeActivitiesListResponse;
}

export const YOUTUBE_ACTIVITIES_LIST = new InjectionToken<
  (
    params?:
      | YoutubeActivitiesListParams
      | (() => YoutubeActivitiesListParams | undefined),
  ) => ReturnType<typeof httpResource<YoutubeActivitiesListResponse>>
>('YOUTUBE_ACTIVITIES_LIST');

export function provideYoutubeActivitiesList(): FactoryProvider {
  return {
    provide: YOUTUBE_ACTIVITIES_LIST,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        params?:
          | YoutubeActivitiesListParams
          | (() => YoutubeActivitiesListParams | undefined),
      ) =>
        httpResource<YoutubeActivitiesListResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/youtube/v3/activities`,
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
