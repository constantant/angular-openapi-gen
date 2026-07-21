import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeChannelsListParams =
  paths['/youtube/v3/channels']['get']['parameters']['query'];

export type YoutubeChannelsListResponse =
  paths['/youtube/v3/channels']['get']['responses']['200']['content']['application/json'];

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
          'A *channel* resource contains information about a YouTube channel.',
        properties: {
          auditDetails: {
            description:
              'The auditionDetails object encapsulates channel data that is relevant for YouTube Partners during the audition process.',
            properties: {
              communityGuidelinesGoodStanding: {
                description:
                  'Whether or not the channel respects the community guidelines.',
                type: 'boolean',
              },
              contentIdClaimsGoodStanding: {
                description:
                  'Whether or not the channel has any unresolved claims.',
                type: 'boolean',
              },
              copyrightStrikesGoodStanding: {
                description:
                  'Whether or not the channel has any copyright strikes.',
                type: 'boolean',
              },
            },
            type: 'object',
          },
          brandingSettings: {
            description:
              'The brandingSettings object encapsulates information about the branding of the channel.',
            properties: {
              channel: {
                description: 'Branding properties for the channel view.',
                properties: {
                  country: {
                    description: 'The country of the channel.',
                    type: 'string',
                  },
                  defaultLanguage: {
                    type: 'string',
                  },
                  defaultTab: {
                    description:
                      'Which content tab users should see when viewing the channel.',
                    type: 'string',
                  },
                  description: {
                    description: 'Specifies the channel description.',
                    type: 'string',
                  },
                  featuredChannelsTitle: {
                    description: 'Title for the featured channels tab.',
                    type: 'string',
                  },
                  featuredChannelsUrls: {
                    description: 'The list of featured channels.',
                    items: {
                      type: 'string',
                    },
                    type: 'array',
                  },
                  keywords: {
                    description:
                      'Lists keywords associated with the channel, comma-separated.',
                    type: 'string',
                  },
                  moderateComments: {
                    description:
                      'Whether user-submitted comments left on the channel page need to be approved by the channel owner to be publicly visible.',
                    type: 'boolean',
                  },
                  profileColor: {
                    description:
                      'A prominent color that can be rendered on this channel page.',
                    type: 'string',
                  },
                  showBrowseView: {
                    description:
                      'Whether the tab to browse the videos should be displayed.',
                    type: 'boolean',
                  },
                  showRelatedChannels: {
                    description: 'Whether related channels should be proposed.',
                    type: 'boolean',
                  },
                  title: {
                    description: 'Specifies the channel title.',
                    type: 'string',
                  },
                  trackingAnalyticsAccountId: {
                    description:
                      'The ID for a Google Analytics account to track and measure traffic to the channels.',
                    type: 'string',
                  },
                  unsubscribedTrailer: {
                    description:
                      'The trailer of the channel, for users that are not subscribers.',
                    type: 'string',
                  },
                },
                type: 'object',
              },
              hints: {
                description: 'Additional experimental branding properties.',
                items: {
                  description: 'A pair Property / Value.',
                  properties: {
                    property: {
                      description: 'A property.',
                      type: 'string',
                    },
                    value: {
                      description: "The property's value.",
                      type: 'string',
                    },
                  },
                  type: 'object',
                },
                type: 'array',
              },
              image: {
                description: 'Branding properties for branding images.',
                properties: {
                  backgroundImageUrl: {
                    description:
                      'The URL for the background image shown on the video watch page. The image should be 1200px by 615px, with a maximum file size of 128k.',
                    properties: {
                      defaultLanguage: {
                        description: 'The language of the default property.',
                        properties: {
                          value: {
                            type: 'string',
                          },
                        },
                        type: 'object',
                      },
                      localized: {
                        items: {
                          properties: {
                            language: {
                              type: 'string',
                            },
                            value: {
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
                  bannerExternalUrl: {
                    description:
                      'This is generated when a ChannelBanner.Insert request has succeeded for the given channel.',
                    type: 'string',
                  },
                  bannerImageUrl: {
                    description: 'Banner image. Desktop size (1060x175).',
                    type: 'string',
                  },
                  bannerMobileExtraHdImageUrl: {
                    description:
                      'Banner image. Mobile size high resolution (1440x395).',
                    type: 'string',
                  },
                  bannerMobileHdImageUrl: {
                    description:
                      'Banner image. Mobile size high resolution (1280x360).',
                    type: 'string',
                  },
                  bannerMobileImageUrl: {
                    description: 'Banner image. Mobile size (640x175).',
                    type: 'string',
                  },
                  bannerMobileLowImageUrl: {
                    description:
                      'Banner image. Mobile size low resolution (320x88).',
                    type: 'string',
                  },
                  bannerMobileMediumHdImageUrl: {
                    description:
                      'Banner image. Mobile size medium/high resolution (960x263).',
                    type: 'string',
                  },
                  bannerTabletExtraHdImageUrl: {
                    description:
                      'Banner image. Tablet size extra high resolution (2560x424).',
                    type: 'string',
                  },
                  bannerTabletHdImageUrl: {
                    description:
                      'Banner image. Tablet size high resolution (2276x377).',
                    type: 'string',
                  },
                  bannerTabletImageUrl: {
                    description: 'Banner image. Tablet size (1707x283).',
                    type: 'string',
                  },
                  bannerTabletLowImageUrl: {
                    description:
                      'Banner image. Tablet size low resolution (1138x188).',
                    type: 'string',
                  },
                  bannerTvHighImageUrl: {
                    description:
                      'Banner image. TV size high resolution (1920x1080).',
                    type: 'string',
                  },
                  bannerTvImageUrl: {
                    description:
                      'Banner image. TV size extra high resolution (2120x1192).',
                    type: 'string',
                  },
                  bannerTvLowImageUrl: {
                    description:
                      'Banner image. TV size low resolution (854x480).',
                    type: 'string',
                  },
                  bannerTvMediumImageUrl: {
                    description:
                      'Banner image. TV size medium resolution (1280x720).',
                    type: 'string',
                  },
                  largeBrandedBannerImageImapScript: {
                    description:
                      'The image map script for the large banner image.',
                    properties: {
                      defaultLanguage: {
                        description: 'The language of the default property.',
                        properties: {
                          value: {
                            type: 'string',
                          },
                        },
                        type: 'object',
                      },
                      localized: {
                        items: {
                          properties: {
                            language: {
                              type: 'string',
                            },
                            value: {
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
                  largeBrandedBannerImageUrl: {
                    description:
                      'The URL for the 854px by 70px image that appears below the video player in the expanded video view of the video watch page.',
                    properties: {
                      defaultLanguage: {
                        description: 'The language of the default property.',
                        properties: {
                          value: {
                            type: 'string',
                          },
                        },
                        type: 'object',
                      },
                      localized: {
                        items: {
                          properties: {
                            language: {
                              type: 'string',
                            },
                            value: {
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
                  smallBrandedBannerImageImapScript: {
                    description:
                      'The image map script for the small banner image.',
                    properties: {
                      defaultLanguage: {
                        description: 'The language of the default property.',
                        properties: {
                          value: {
                            type: 'string',
                          },
                        },
                        type: 'object',
                      },
                      localized: {
                        items: {
                          properties: {
                            language: {
                              type: 'string',
                            },
                            value: {
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
                  smallBrandedBannerImageUrl: {
                    description:
                      'The URL for the 640px by 70px banner image that appears below the video player in the default view of the video watch page. The URL for the image that appears above the top-left corner of the video player. This is a 25-pixel-high image with a flexible width that cannot exceed 170 pixels.',
                    properties: {
                      defaultLanguage: {
                        description: 'The language of the default property.',
                        properties: {
                          value: {
                            type: 'string',
                          },
                        },
                        type: 'object',
                      },
                      localized: {
                        items: {
                          properties: {
                            language: {
                              type: 'string',
                            },
                            value: {
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
                  trackingImageUrl: {
                    description:
                      'The URL for a 1px by 1px tracking pixel that can be used to collect statistics for views of the channel or video pages.',
                    type: 'string',
                  },
                  watchIconImageUrl: {
                    type: 'string',
                  },
                },
                type: 'object',
              },
              watch: {
                description: 'Branding properties for the watch page.',
                properties: {
                  backgroundColor: {
                    description:
                      "The text color for the video watch page's branded area.",
                    type: 'string',
                  },
                  featuredPlaylistId: {
                    description:
                      'An ID that uniquely identifies a playlist that displays next to the video player.',
                    type: 'string',
                  },
                  textColor: {
                    description:
                      "The background color for the video watch page's branded area.",
                    type: 'string',
                  },
                },
                type: 'object',
              },
            },
            type: 'object',
          },
          contentDetails: {
            description:
              "The contentDetails object encapsulates information about the channel's content.",
            properties: {
              relatedPlaylists: {
                properties: {
                  favorites: {
                    description:
                      'The ID of the playlist that contains the channel"s favorite videos. Use the playlistItems.insert and playlistItems.delete to add or remove items from that list.',
                    type: 'string',
                  },
                  likes: {
                    description:
                      'The ID of the playlist that contains the channel"s liked videos. Use the playlistItems.insert and playlistItems.delete to add or remove items from that list.',
                    type: 'string',
                  },
                  uploads: {
                    description:
                      'The ID of the playlist that contains the channel"s uploaded videos. Use the videos.insert method to upload new videos and the videos.delete method to delete previously uploaded videos.',
                    type: 'string',
                  },
                  watchHistory: {
                    description:
                      'The ID of the playlist that contains the channel"s watch history. Use the playlistItems.insert and playlistItems.delete to add or remove items from that list.',
                    type: 'string',
                  },
                  watchLater: {
                    description:
                      'The ID of the playlist that contains the channel"s watch later playlist. Use the playlistItems.insert and playlistItems.delete to add or remove items from that list.',
                    type: 'string',
                  },
                },
                type: 'object',
              },
            },
            type: 'object',
          },
          contentOwnerDetails: {
            description:
              'The contentOwnerDetails object encapsulates channel data that is relevant for YouTube Partners linked with the channel.',
            properties: {
              contentOwner: {
                description:
                  'The ID of the content owner linked to the channel.',
                type: 'string',
              },
              timeLinked: {
                description:
                  'The date and time when the channel was linked to the content owner.',
                format: 'date-time',
                type: 'string',
              },
            },
            type: 'object',
          },
          conversionPings: {
            description:
              'The conversionPings object encapsulates information about conversion pings that need to be respected by the channel.',
            properties: {
              pings: {
                description:
                  'Pings that the app shall fire (authenticated by biscotti cookie). Each ping has a context, in which the app must fire the ping, and a url identifying the ping.',
                items: {
                  description:
                    'Pings that the app shall fire (authenticated by biscotti cookie). Each ping has a context, in which the app must fire the ping, and a url identifying the ping.',
                  properties: {
                    context: {
                      description: 'Defines the context of the ping.',
                      enum: ['subscribe', 'unsubscribe', 'cview'],
                      type: 'string',
                    },
                    conversionUrl: {
                      description:
                        "The url (without the schema) that the player shall send the ping to. It's at caller's descretion to decide which schema to use (http vs https) Example of a returned url: //googleads.g.doubleclick.net/pagead/ viewthroughconversion/962985656/?data=path%3DtHe_path%3Btype%3D cview%3Butuid%3DGISQtTNGYqaYl4sKxoVvKA&labe=default The caller must append biscotti authentication (ms param in case of mobile, for example) to this ping.",
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
          etag: {
            description: 'Etag of this resource.',
            type: 'string',
          },
          id: {
            description:
              'The ID that YouTube uses to uniquely identify the channel.',
            type: 'string',
          },
          kind: {
            default: 'youtube#channel',
            description:
              'Identifies what kind of resource this is. Value: the fixed string "youtube#channel".',
            type: 'string',
          },
          localizations: {
            additionalProperties: {
              description: 'Channel localization setting',
              properties: {
                description: {
                  description:
                    "The localized strings for channel's description.",
                  type: 'string',
                },
                title: {
                  description: "The localized strings for channel's title.",
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
              'The snippet object contains basic details about the channel, such as its title, description, and thumbnail images.',
            properties: {
              country: {
                description: 'The country of the channel.',
                type: 'string',
              },
              customUrl: {
                description: 'The custom url of the channel.',
                type: 'string',
              },
              defaultLanguage: {
                description:
                  "The language of the channel's default title and description.",
                type: 'string',
              },
              description: {
                description: 'The description of the channel.',
                type: 'string',
              },
              localized: {
                description: 'Channel localization setting',
                properties: {
                  description: {
                    description:
                      "The localized strings for channel's description.",
                    type: 'string',
                  },
                  title: {
                    description: "The localized strings for channel's title.",
                    type: 'string',
                  },
                },
                type: 'object',
              },
              publishedAt: {
                description: 'The date and time that the channel was created.',
                format: 'date-time',
                type: 'string',
              },
              thumbnails: {
                description:
                  'A map of thumbnail images associated with the channel. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail. When displaying thumbnails in your application, make sure that your code uses the image URLs exactly as they are returned in API responses. For example, your application should not use the http domain instead of the https domain in a URL returned in an API response. Beginning in July 2018, channel thumbnail URLs will only be available in the https domain, which is how the URLs appear in API responses. After that time, you might see broken images in your application if it tries to load YouTube images from the http domain. Thumbnail images might be empty for newly created channels and might take up to one day to populate.',
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
                description: "The channel's title.",
                type: 'string',
              },
            },
            type: 'object',
          },
          statistics: {
            description:
              'The statistics object encapsulates statistics for the channel.',
            properties: {
              commentCount: {
                description: 'The number of comments for the channel.',
                format: 'uint64',
                type: 'string',
              },
              hiddenSubscriberCount: {
                description:
                  'Whether or not the number of subscribers is shown for this user.',
                type: 'boolean',
              },
              subscriberCount: {
                description: 'The number of subscribers that the channel has.',
                format: 'uint64',
                type: 'string',
              },
              videoCount: {
                description: 'The number of videos uploaded to the channel.',
                format: 'uint64',
                type: 'string',
              },
              viewCount: {
                description: 'The number of times the channel has been viewed.',
                format: 'uint64',
                type: 'string',
              },
            },
            type: 'object',
          },
          status: {
            description:
              'The status object encapsulates information about the privacy status of the channel.',
            properties: {
              isLinked: {
                description:
                  "If true, then the user is linked to either a YouTube username or G+ account. Otherwise, the user doesn't have a public YouTube identity.",
                type: 'boolean',
              },
              longUploadsStatus: {
                description:
                  'The long uploads status of this channel. See https://support.google.com/youtube/answer/71673 for more information.',
                enum: [
                  'longUploadsUnspecified',
                  'allowed',
                  'eligible',
                  'disallowed',
                ],
                type: 'string',
              },
              madeForKids: {
                type: 'boolean',
              },
              privacyStatus: {
                description: 'Privacy status of the channel.',
                enum: ['public', 'unlisted', 'private'],
                type: 'string',
              },
              selfDeclaredMadeForKids: {
                type: 'boolean',
              },
            },
            type: 'object',
          },
          topicDetails: {
            description:
              'The topicDetails object encapsulates information about Freebase topics associated with the channel.',
            properties: {
              topicCategories: {
                description:
                  "A list of Wikipedia URLs that describe the channel's content.",
                items: {
                  type: 'string',
                },
                type: 'array',
              },
              topicIds: {
                description:
                  'A list of Freebase topic IDs associated with the channel. You can retrieve information about each topic using the Freebase Topic API.',
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
      },
      type: 'array',
    },
    kind: {
      default: 'youtube#channelListResponse',
      description:
        'Identifies what kind of resource this is. Value: the fixed string "youtube#channelListResponse".',
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

function _validateResponse(value: unknown): YoutubeChannelsListResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `YoutubeChannelsList response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as YoutubeChannelsListResponse;
}

export const YOUTUBE_CHANNELS_LIST = new InjectionToken<
  (
    params?:
      YoutubeChannelsListParams | (() => YoutubeChannelsListParams | undefined),
  ) => ReturnType<typeof httpResource<YoutubeChannelsListResponse>>
>('YOUTUBE_CHANNELS_LIST');

export function provideYoutubeChannelsList(): FactoryProvider {
  return {
    provide: YOUTUBE_CHANNELS_LIST,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        params?:
          | YoutubeChannelsListParams
          | (() => YoutubeChannelsListParams | undefined),
      ) =>
        httpResource<YoutubeChannelsListResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/youtube/v3/channels`,
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
