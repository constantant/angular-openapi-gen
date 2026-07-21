import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeCommentsUpdateBody = NonNullable<
  paths['/youtube/v3/comments']['put']['requestBody']
>['content']['application/json'];

export type YoutubeCommentsUpdateResponse =
  paths['/youtube/v3/comments']['put']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  description: 'A *comment* represents a single YouTube comment.',
  properties: {
    etag: {
      description: 'Etag of this resource.',
      type: 'string',
    },
    id: {
      description: 'The ID that YouTube uses to uniquely identify the comment.',
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
          description: "The id of the author's YouTube channel, if any.",
          properties: {
            value: {
              type: 'string',
            },
          },
          type: 'object',
        },
        authorChannelUrl: {
          description: "Link to the author's YouTube channel, if any.",
          type: 'string',
        },
        authorDisplayName: {
          description: 'The name of the user who posted the comment.',
          type: 'string',
        },
        authorProfileImageUrl: {
          description:
            'The URL for the avatar of the user who posted the comment.',
          type: 'string',
        },
        canRate: {
          description: 'Whether the current viewer can rate this comment.',
          type: 'boolean',
        },
        channelId: {
          description:
            "The id of the corresponding YouTube channel. In case of a channel comment this is the channel the comment refers to. In case of a video comment it's the video's channel.",
          type: 'string',
        },
        likeCount: {
          description: 'The total number of likes this comment has received.',
          format: 'uint32',
          type: 'integer',
        },
        moderationStatus: {
          description:
            "The comment's moderation status. Will not be set if the comments were requested through the id filter.",
          enum: ['published', 'heldForReview', 'likelySpam', 'rejected'],
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
          description: 'The date and time when the comment was last updated.',
          format: 'date-time',
          type: 'string',
        },
        videoId: {
          description: 'The ID of the video the comment refers to, if any.',
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
};

function _validateResponse(value: unknown): YoutubeCommentsUpdateResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `YoutubeCommentsUpdate response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as YoutubeCommentsUpdateResponse;
}

export const YOUTUBE_COMMENTS_UPDATE = new InjectionToken<
  (
    body: YoutubeCommentsUpdateBody | Signal<YoutubeCommentsUpdateBody>,
  ) => ReturnType<typeof httpResource<YoutubeCommentsUpdateResponse>>
>('YOUTUBE_COMMENTS_UPDATE');

export function provideYoutubeCommentsUpdate(): FactoryProvider {
  return {
    provide: YOUTUBE_COMMENTS_UPDATE,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body: YoutubeCommentsUpdateBody | Signal<YoutubeCommentsUpdateBody>,
      ) =>
        httpResource<YoutubeCommentsUpdateResponse>(
          () => ({
            url: `${base}/youtube/v3/comments`,
            method: 'PUT',
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
