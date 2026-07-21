import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeCommentThreadsListParams =
  paths['/youtube/v3/commentThreads']['get']['parameters']['query'];

export type YoutubeCommentThreadsListResponse =
  paths['/youtube/v3/commentThreads']['get']['responses']['200']['content']['application/json'];

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
      description: 'A list of comment threads that match the request criteria.',
      items: {
        description:
          'A *comment thread* represents information that applies to a top level comment and all its replies. It can also include the top level comment itself and some of the replies.',
        properties: {
          etag: {
            description: 'Etag of this resource.',
            type: 'string',
          },
          id: {
            description:
              'The ID that YouTube uses to uniquely identify the comment thread.',
            type: 'string',
          },
          kind: {
            default: 'youtube#commentThread',
            description:
              'Identifies what kind of resource this is. Value: the fixed string "youtube#commentThread".',
            type: 'string',
          },
          replies: {
            description:
              'The replies object contains a limited number of replies (if any) to the top level comment found in the snippet.',
            properties: {
              comments: {
                description:
                  'A limited number of replies. Unless the number of replies returned equals total_reply_count in the snippet the returned replies are only a subset of the total number of replies.',
                items: {
                  description:
                    'A *comment* represents a single YouTube comment.',
                  properties: {
                    etag: {
                      description: 'Etag of this resource.',
                      type: 'string',
                    },
                    id: {
                      description:
                        'The ID that YouTube uses to uniquely identify the comment.',
                      type: 'string',
                    },
                    kind: {
                      default: 'youtube#comment',
                      description:
                        'Identifies what kind of resource this is. Value: the fixed string "youtube#comment".',
                      type: 'string',
                    },
                    snippet: {
                      description:
                        'The snippet object contains basic details about the comment.',
                      properties: {
                        authorChannelId: {
                          description:
                            "The id of the author's YouTube channel, if any.",
                          properties: {
                            value: {
                              type: 'string',
                            },
                          },
                          type: 'object',
                        },
                        authorChannelUrl: {
                          description:
                            "Link to the author's YouTube channel, if any.",
                          type: 'string',
                        },
                        authorDisplayName: {
                          description:
                            'The name of the user who posted the comment.',
                          type: 'string',
                        },
                        authorProfileImageUrl: {
                          description:
                            'The URL for the avatar of the user who posted the comment.',
                          type: 'string',
                        },
                        canRate: {
                          description:
                            'Whether the current viewer can rate this comment.',
                          type: 'boolean',
                        },
                        channelId: {
                          description:
                            "The id of the corresponding YouTube channel. In case of a channel comment this is the channel the comment refers to. In case of a video comment it's the video's channel.",
                          type: 'string',
                        },
                        likeCount: {
                          description:
                            'The total number of likes this comment has received.',
                          format: 'uint32',
                          type: 'integer',
                        },
                        moderationStatus: {
                          description:
                            "The comment's moderation status. Will not be set if the comments were requested through the id filter.",
                          enum: [
                            'published',
                            'heldForReview',
                            'likelySpam',
                            'rejected',
                          ],
                          type: 'string',
                        },
                        parentId: {
                          description:
                            'The unique id of the parent comment, only set for replies.',
                          type: 'string',
                        },
                        publishedAt: {
                          description:
                            'The date and time when the comment was originally published.',
                          format: 'date-time',
                          type: 'string',
                        },
                        textDisplay: {
                          description:
                            "The comment's text. The format is either plain text or HTML dependent on what has been requested. Even the plain text representation may differ from the text originally posted in that it may replace video links with video titles etc.",
                          type: 'string',
                        },
                        textOriginal: {
                          description:
                            "The comment's original raw text as initially posted or last updated. The original text will only be returned if it is accessible to the viewer, which is only guaranteed if the viewer is the comment's author.",
                          type: 'string',
                        },
                        updatedAt: {
                          description:
                            'The date and time when the comment was last updated.',
                          format: 'date-time',
                          type: 'string',
                        },
                        videoId: {
                          description:
                            'The ID of the video the comment refers to, if any.',
                          type: 'string',
                        },
                        viewerRating: {
                          description:
                            'The rating the viewer has given to this comment. For the time being this will never return RATE_TYPE_DISLIKE and instead return RATE_TYPE_NONE. This may change in the future.',
                          enum: ['none', 'like', 'dislike'],
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
            },
            type: 'object',
          },
          snippet: {
            description:
              'The snippet object contains basic details about the comment thread and also the top level comment.',
            properties: {
              canReply: {
                description:
                  'Whether the current viewer of the thread can reply to it. This is viewer specific - other viewers may see a different value for this field.',
                type: 'boolean',
              },
              channelId: {
                description:
                  "The YouTube channel the comments in the thread refer to or the channel with the video the comments refer to. If video_id isn't set the comments refer to the channel itself.",
                type: 'string',
              },
              isPublic: {
                description:
                  'Whether the thread (and therefore all its comments) is visible to all YouTube users.',
                type: 'boolean',
              },
              topLevelComment: {
                description: 'A *comment* represents a single YouTube comment.',
                properties: {
                  etag: {
                    description: 'Etag of this resource.',
                    type: 'string',
                  },
                  id: {
                    description:
                      'The ID that YouTube uses to uniquely identify the comment.',
                    type: 'string',
                  },
                  kind: {
                    default: 'youtube#comment',
                    description:
                      'Identifies what kind of resource this is. Value: the fixed string "youtube#comment".',
                    type: 'string',
                  },
                  snippet: {
                    description:
                      'The snippet object contains basic details about the comment.',
                    properties: {
                      authorChannelId: {
                        description:
                          "The id of the author's YouTube channel, if any.",
                        properties: {
                          value: {
                            type: 'string',
                          },
                        },
                        type: 'object',
                      },
                      authorChannelUrl: {
                        description:
                          "Link to the author's YouTube channel, if any.",
                        type: 'string',
                      },
                      authorDisplayName: {
                        description:
                          'The name of the user who posted the comment.',
                        type: 'string',
                      },
                      authorProfileImageUrl: {
                        description:
                          'The URL for the avatar of the user who posted the comment.',
                        type: 'string',
                      },
                      canRate: {
                        description:
                          'Whether the current viewer can rate this comment.',
                        type: 'boolean',
                      },
                      channelId: {
                        description:
                          "The id of the corresponding YouTube channel. In case of a channel comment this is the channel the comment refers to. In case of a video comment it's the video's channel.",
                        type: 'string',
                      },
                      likeCount: {
                        description:
                          'The total number of likes this comment has received.',
                        format: 'uint32',
                        type: 'integer',
                      },
                      moderationStatus: {
                        description:
                          "The comment's moderation status. Will not be set if the comments were requested through the id filter.",
                        enum: [
                          'published',
                          'heldForReview',
                          'likelySpam',
                          'rejected',
                        ],
                        type: 'string',
                      },
                      parentId: {
                        description:
                          'The unique id of the parent comment, only set for replies.',
                        type: 'string',
                      },
                      publishedAt: {
                        description:
                          'The date and time when the comment was originally published.',
                        format: 'date-time',
                        type: 'string',
                      },
                      textDisplay: {
                        description:
                          "The comment's text. The format is either plain text or HTML dependent on what has been requested. Even the plain text representation may differ from the text originally posted in that it may replace video links with video titles etc.",
                        type: 'string',
                      },
                      textOriginal: {
                        description:
                          "The comment's original raw text as initially posted or last updated. The original text will only be returned if it is accessible to the viewer, which is only guaranteed if the viewer is the comment's author.",
                        type: 'string',
                      },
                      updatedAt: {
                        description:
                          'The date and time when the comment was last updated.',
                        format: 'date-time',
                        type: 'string',
                      },
                      videoId: {
                        description:
                          'The ID of the video the comment refers to, if any.',
                        type: 'string',
                      },
                      viewerRating: {
                        description:
                          'The rating the viewer has given to this comment. For the time being this will never return RATE_TYPE_DISLIKE and instead return RATE_TYPE_NONE. This may change in the future.',
                        enum: ['none', 'like', 'dislike'],
                        type: 'string',
                      },
                    },
                    type: 'object',
                  },
                },
                type: 'object',
              },
              totalReplyCount: {
                description:
                  'The total number of replies (not including the top level comment).',
                format: 'uint32',
                type: 'integer',
              },
              videoId: {
                description:
                  'The ID of the video the comments refer to, if any. No video_id implies a channel discussion comment.',
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
      default: 'youtube#commentThreadListResponse',
      description:
        'Identifies what kind of resource this is. Value: the fixed string "youtube#commentThreadListResponse".',
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

function _validateResponse(value: unknown): YoutubeCommentThreadsListResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `YoutubeCommentThreadsList response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as YoutubeCommentThreadsListResponse;
}

export const YOUTUBE_COMMENT_THREADS_LIST = new InjectionToken<
  (
    params?:
      | YoutubeCommentThreadsListParams
      | (() => YoutubeCommentThreadsListParams | undefined),
  ) => ReturnType<typeof httpResource<YoutubeCommentThreadsListResponse>>
>('YOUTUBE_COMMENT_THREADS_LIST');

export function provideYoutubeCommentThreadsList(): FactoryProvider {
  return {
    provide: YOUTUBE_COMMENT_THREADS_LIST,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        params?:
          | YoutubeCommentThreadsListParams
          | (() => YoutubeCommentThreadsListParams | undefined),
      ) =>
        httpResource<YoutubeCommentThreadsListResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/youtube/v3/commentThreads`,
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
