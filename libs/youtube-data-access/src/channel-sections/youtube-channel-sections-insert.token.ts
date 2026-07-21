import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeChannelSectionsInsertBody = NonNullable<
  paths['/youtube/v3/channelSections']['post']['requestBody']
>['content']['application/json'];

export type YoutubeChannelSectionsInsertResponse =
  paths['/youtube/v3/channelSections']['post']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  properties: {
    contentDetails: {
      description:
        'The contentDetails object contains details about the channel section content, such as a list of playlists or channels featured in the section.',
      properties: {
        channels: {
          description: 'The channel ids for type multiple_channels.',
          items: {
            type: 'string',
          },
          type: 'array',
        },
        playlists: {
          description:
            'The playlist ids for type single_playlist and multiple_playlists. For singlePlaylist, only one playlistId is allowed.',
          items: {
            type: 'string',
          },
          type: 'array',
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
        'The ID that YouTube uses to uniquely identify the channel section.',
      type: 'string',
    },
    kind: {
      default: 'youtube#channelSection',
      description:
        'Identifies what kind of resource this is. Value: the fixed string "youtube#channelSection".',
      type: 'string',
    },
    localizations: {
      additionalProperties: {
        description: 'ChannelSection localization setting',
        properties: {
          title: {
            description: "The localized strings for channel section's title.",
            type: 'string',
          },
        },
        type: 'object',
      },
      description: 'Localizations for different languages',
      type: 'object',
    },
    snippet: {
      description:
        'The snippet object contains basic details about the channel section, such as its type, style and title.',
      properties: {
        channelId: {
          description:
            'The ID that YouTube uses to uniquely identify the channel that published the channel section.',
          type: 'string',
        },
        defaultLanguage: {
          description:
            "The language of the channel section's default title and description.",
          type: 'string',
        },
        localized: {
          description: 'ChannelSection localization setting',
          properties: {
            title: {
              description: "The localized strings for channel section's title.",
              type: 'string',
            },
          },
          type: 'object',
        },
        position: {
          description: 'The position of the channel section in the channel.',
          format: 'uint32',
          type: 'integer',
        },
        style: {
          description: 'The style of the channel section.',
          enum: [
            'channelsectionStyleUnspecified',
            'horizontalRow',
            'verticalList',
          ],
          type: 'string',
        },
        title: {
          description:
            "The channel section's title for multiple_playlists and multiple_channels.",
          type: 'string',
        },
        type: {
          description: 'The type of the channel section.',
          enum: [
            'channelsectionTypeUndefined',
            'singlePlaylist',
            'multiplePlaylists',
            'popularUploads',
            'recentUploads',
            'likes',
            'allPlaylists',
            'likedPlaylists',
            'recentPosts',
            'recentActivity',
            'liveEvents',
            'upcomingEvents',
            'completedEvents',
            'multipleChannels',
            'postedVideos',
            'postedPlaylists',
            'subscriptions',
          ],
          type: 'string',
        },
      },
      type: 'object',
    },
    targeting: {
      description:
        'The targeting object contains basic targeting settings about the channel section.',
      properties: {
        countries: {
          description: 'The country the channel section is targeting.',
          items: {
            type: 'string',
          },
          type: 'array',
        },
        languages: {
          description: 'The language the channel section is targeting.',
          items: {
            type: 'string',
          },
          type: 'array',
        },
        regions: {
          description: 'The region the channel section is targeting.',
          items: {
            type: 'string',
          },
          type: 'array',
        },
      },
      type: 'object',
    },
  },
  type: 'object',
};

function _validateResponse(
  value: unknown,
): YoutubeChannelSectionsInsertResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `YoutubeChannelSectionsInsert response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as YoutubeChannelSectionsInsertResponse;
}

export const YOUTUBE_CHANNEL_SECTIONS_INSERT = new InjectionToken<
  (
    body:
      | YoutubeChannelSectionsInsertBody
      | Signal<YoutubeChannelSectionsInsertBody>,
  ) => ReturnType<typeof httpResource<YoutubeChannelSectionsInsertResponse>>
>('YOUTUBE_CHANNEL_SECTIONS_INSERT');

export function provideYoutubeChannelSectionsInsert(): FactoryProvider {
  return {
    provide: YOUTUBE_CHANNEL_SECTIONS_INSERT,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body:
          | YoutubeChannelSectionsInsertBody
          | Signal<YoutubeChannelSectionsInsertBody>,
      ) =>
        httpResource<YoutubeChannelSectionsInsertResponse>(
          () => ({
            url: `${base}/youtube/v3/channelSections`,
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
