import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubePlaylistItemsUpdateBody = NonNullable<
  paths['/youtube/v3/playlistItems']['put']['requestBody']
>['content']['application/json'];

export type YoutubePlaylistItemsUpdateResponse =
  paths['/youtube/v3/playlistItems']['put']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  description:
    "A *playlistItem* resource identifies another resource, such as a video, that is included in a playlist. In addition, the playlistItem resource contains details about the included resource that pertain specifically to how that resource is used in that playlist. YouTube uses playlists to identify special collections of videos for a channel, such as: - uploaded videos - favorite videos - positively rated (liked) videos - watch history - watch later To be more specific, these lists are associated with a channel, which is a collection of a person, group, or company's videos, playlists, and other YouTube information. You can retrieve the playlist IDs for each of these lists from the channel resource for a given channel. You can then use the playlistItems.list method to retrieve any of those lists. You can also add or remove items from those lists by calling the playlistItems.insert and playlistItems.delete methods. For example, if a user gives a positive rating to a video, you would insert that video into the liked videos playlist for that user's channel.",
  properties: {
    contentDetails: {
      description:
        'The contentDetails object is included in the resource if the included item is a YouTube video. The object contains additional information about the video.',
      properties: {
        endAt: {
          description:
            'The time, measured in seconds from the start of the video, when the video should stop playing. (The playlist owner can specify the times when the video should start and stop playing when the video is played in the context of the playlist.) By default, assume that the video.endTime is the end of the video.',
          type: 'string',
        },
        note: {
          description: 'A user-generated note for this item.',
          type: 'string',
        },
        startAt: {
          description:
            'The time, measured in seconds from the start of the video, when the video should start playing. (The playlist owner can specify the times when the video should start and stop playing when the video is played in the context of the playlist.) The default value is 0.',
          type: 'string',
        },
        videoId: {
          description:
            'The ID that YouTube uses to uniquely identify a video. To retrieve the video resource, set the id query parameter to this value in your API request.',
          type: 'string',
        },
        videoPublishedAt: {
          description:
            'The date and time that the video was published to YouTube.',
          format: 'date-time',
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
        'The ID that YouTube uses to uniquely identify the playlist item.',
      type: 'string',
    },
    kind: {
      default: 'youtube#playlistItem',
      description:
        'Identifies what kind of resource this is. Value: the fixed string "youtube#playlistItem".',
      type: 'string',
    },
    snippet: {
      description:
        'The snippet object contains basic details about the playlist item, such as its title and position in the playlist.',
      properties: {
        channelId: {
          description:
            'The ID that YouTube uses to uniquely identify the user that added the item to the playlist.',
          type: 'string',
        },
        channelTitle: {
          description:
            'Channel title for the channel that the playlist item belongs to.',
          type: 'string',
        },
        description: {
          description: "The item's description.",
          type: 'string',
        },
        playlistId: {
          description:
            'The ID that YouTube uses to uniquely identify thGe playlist that the playlist item is in.',
          type: 'string',
        },
        position: {
          description:
            'The order in which the item appears in the playlist. The value uses a zero-based index, so the first item has a position of 0, the second item has a position of 1, and so forth.',
          format: 'uint32',
          type: 'integer',
        },
        publishedAt: {
          description:
            'The date and time that the item was added to the playlist.',
          format: 'date-time',
          type: 'string',
        },
        resourceId: {
          description:
            'The id object contains information that can be used to uniquely identify the resource that is included in the playlist as the playlist item.',
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
            'A map of thumbnail images associated with the playlist item. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail.',
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
          description: "The item's title.",
          type: 'string',
        },
        videoOwnerChannelId: {
          description: 'Channel id for the channel this video belongs to.',
          type: 'string',
        },
        videoOwnerChannelTitle: {
          description: 'Channel title for the channel this video belongs to.',
          type: 'string',
        },
      },
      type: 'object',
    },
    status: {
      description:
        "The status object contains information about the playlist item's privacy status.",
      properties: {
        privacyStatus: {
          description: "This resource's privacy status.",
          enum: ['public', 'unlisted', 'private'],
          type: 'string',
        },
      },
      type: 'object',
    },
  },
  type: 'object',
};

function _validateResponse(value: unknown): YoutubePlaylistItemsUpdateResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `YoutubePlaylistItemsUpdate response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as YoutubePlaylistItemsUpdateResponse;
}

export const YOUTUBE_PLAYLIST_ITEMS_UPDATE = new InjectionToken<
  (
    body:
      YoutubePlaylistItemsUpdateBody | Signal<YoutubePlaylistItemsUpdateBody>,
  ) => ReturnType<typeof httpResource<YoutubePlaylistItemsUpdateResponse>>
>('YOUTUBE_PLAYLIST_ITEMS_UPDATE');

export function provideYoutubePlaylistItemsUpdate(): FactoryProvider {
  return {
    provide: YOUTUBE_PLAYLIST_ITEMS_UPDATE,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body:
          | YoutubePlaylistItemsUpdateBody
          | Signal<YoutubePlaylistItemsUpdateBody>,
      ) =>
        httpResource<YoutubePlaylistItemsUpdateResponse>(
          () => ({
            url: `${base}/youtube/v3/playlistItems`,
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
