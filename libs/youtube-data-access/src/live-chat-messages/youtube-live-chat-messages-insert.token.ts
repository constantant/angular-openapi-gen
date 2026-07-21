import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeLiveChatMessagesInsertBody = NonNullable<
  paths['/youtube/v3/liveChat/messages']['post']['requestBody']
>['content']['application/json'];

export type YoutubeLiveChatMessagesInsertResponse =
  paths['/youtube/v3/liveChat/messages']['post']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  description:
    'A *liveChatMessage* resource represents a chat message in a YouTube Live Chat.',
  properties: {
    authorDetails: {
      description:
        'The authorDetails object contains basic details about the user that posted this message.',
      properties: {
        channelId: {
          description: 'The YouTube channel ID.',
          type: 'string',
        },
        channelUrl: {
          description: "The channel's URL.",
          type: 'string',
        },
        displayName: {
          description: "The channel's display name.",
          type: 'string',
        },
        isChatModerator: {
          description: 'Whether the author is a moderator of the live chat.',
          type: 'boolean',
        },
        isChatOwner: {
          description: 'Whether the author is the owner of the live chat.',
          type: 'boolean',
        },
        isChatSponsor: {
          description: 'Whether the author is a sponsor of the live chat.',
          type: 'boolean',
        },
        isVerified: {
          description:
            "Whether the author's identity has been verified by YouTube.",
          type: 'boolean',
        },
        profileImageUrl: {
          description: "The channels's avatar URL.",
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
        'The ID that YouTube assigns to uniquely identify the message.',
      type: 'string',
    },
    kind: {
      default: 'youtube#liveChatMessage',
      description:
        'Identifies what kind of resource this is. Value: the fixed string "youtube#liveChatMessage".',
      type: 'string',
    },
    snippet: {
      description:
        'The snippet object contains basic details about the message.',
      properties: {
        authorChannelId: {
          description:
            'The ID of the user that authored this message, this field is not always filled. textMessageEvent - the user that wrote the message fanFundingEvent - the user that funded the broadcast newSponsorEvent - the user that just became a sponsor memberMilestoneChatEvent - the member that sent the message membershipGiftingEvent - the user that made the purchase giftMembershipReceivedEvent - the user that received the gift membership messageDeletedEvent - the moderator that took the action messageRetractedEvent - the author that retracted their message userBannedEvent - the moderator that took the action superChatEvent - the user that made the purchase superStickerEvent - the user that made the purchase',
          type: 'string',
        },
        displayMessage: {
          description:
            'Contains a string that can be displayed to the user. If this field is not present the message is silent, at the moment only messages of type TOMBSTONE and CHAT_ENDED_EVENT are silent.',
          type: 'string',
        },
        fanFundingEventDetails: {
          description:
            "Details about the funding event, this is only set if the type is 'fanFundingEvent'.",
          properties: {
            amountDisplayString: {
              description:
                'A rendered string that displays the fund amount and currency to the user.',
              type: 'string',
            },
            amountMicros: {
              description: 'The amount of the fund.',
              format: 'uint64',
              type: 'string',
            },
            currency: {
              description: 'The currency in which the fund was made.',
              type: 'string',
            },
            userComment: {
              description:
                'The comment added by the user to this fan funding event.',
              type: 'string',
            },
          },
          type: 'object',
        },
        giftMembershipReceivedDetails: {
          description:
            "Details about the Gift Membership Received event, this is only set if the type is 'giftMembershipReceivedEvent'.",
          properties: {
            associatedMembershipGiftingMessageId: {
              description:
                "The ID of the membership gifting message that is related to this gift membership. This ID will always refer to a message whose type is 'membershipGiftingEvent'.",
              type: 'string',
            },
            gifterChannelId: {
              description:
                'The ID of the user that made the membership gifting purchase. This matches the `snippet.authorChannelId` of the associated membership gifting message.',
              type: 'string',
            },
            memberLevelName: {
              description:
                "The name of the Level at which the viewer is a member. This matches the `snippet.membershipGiftingDetails.giftMembershipsLevelName` of the associated membership gifting message. The Level names are defined by the YouTube channel offering the Membership. In some situations this field isn't filled.",
              type: 'string',
            },
          },
          type: 'object',
        },
        hasDisplayContent: {
          description:
            'Whether the message has display content that should be displayed to users.',
          type: 'boolean',
        },
        liveChatId: {
          type: 'string',
        },
        memberMilestoneChatDetails: {
          description:
            "Details about the Member Milestone Chat event, this is only set if the type is 'memberMilestoneChatEvent'.",
          properties: {
            memberLevelName: {
              description:
                "The name of the Level at which the viever is a member. The Level names are defined by the YouTube channel offering the Membership. In some situations this field isn't filled.",
              type: 'string',
            },
            memberMonth: {
              description:
                'The total amount of months (rounded up) the viewer has been a member that granted them this Member Milestone Chat. This is the same number of months as is being displayed to YouTube users.',
              format: 'uint32',
              type: 'integer',
            },
            userComment: {
              description:
                'The comment added by the member to this Member Milestone Chat. This field is empty for messages without a comment from the member.',
              type: 'string',
            },
          },
          type: 'object',
        },
        membershipGiftingDetails: {
          description:
            "Details about the Membership Gifting event, this is only set if the type is 'membershipGiftingEvent'.",
          properties: {
            giftMembershipsCount: {
              description:
                'The number of gift memberships purchased by the user.',
              format: 'int32',
              type: 'integer',
            },
            giftMembershipsLevelName: {
              description:
                "The name of the level of the gift memberships purchased by the user. The Level names are defined by the YouTube channel offering the Membership. In some situations this field isn't filled.",
              type: 'string',
            },
          },
          type: 'object',
        },
        messageDeletedDetails: {
          properties: {
            deletedMessageId: {
              type: 'string',
            },
          },
          type: 'object',
        },
        messageRetractedDetails: {
          properties: {
            retractedMessageId: {
              type: 'string',
            },
          },
          type: 'object',
        },
        newSponsorDetails: {
          description:
            'Details about the New Member Announcement event, this is only set if the type is \'newSponsorEvent\'. Please note that "member" is the new term for "sponsor".',
          properties: {
            isUpgrade: {
              description:
                'If the viewer just had upgraded from a lower level. For viewers that were not members at the time of purchase, this field is false.',
              type: 'boolean',
            },
            memberLevelName: {
              description:
                "The name of the Level that the viewer just had joined. The Level names are defined by the YouTube channel offering the Membership. In some situations this field isn't filled.",
              type: 'string',
            },
          },
          type: 'object',
        },
        publishedAt: {
          description:
            'The date and time when the message was orignally published.',
          format: 'date-time',
          type: 'string',
        },
        superChatDetails: {
          description:
            "Details about the Super Chat event, this is only set if the type is 'superChatEvent'.",
          properties: {
            amountDisplayString: {
              description:
                'A rendered string that displays the fund amount and currency to the user.',
              type: 'string',
            },
            amountMicros: {
              description:
                'The amount purchased by the user, in micros (1,750,000 micros = 1.75).',
              format: 'uint64',
              type: 'string',
            },
            currency: {
              description: 'The currency in which the purchase was made.',
              type: 'string',
            },
            tier: {
              description:
                'The tier in which the amount belongs. Lower amounts belong to lower tiers. The lowest tier is 1.',
              format: 'uint32',
              type: 'integer',
            },
            userComment: {
              description:
                'The comment added by the user to this Super Chat event.',
              type: 'string',
            },
          },
          type: 'object',
        },
        superStickerDetails: {
          description:
            "Details about the Super Sticker event, this is only set if the type is 'superStickerEvent'.",
          properties: {
            amountDisplayString: {
              description:
                'A rendered string that displays the fund amount and currency to the user.',
              type: 'string',
            },
            amountMicros: {
              description:
                'The amount purchased by the user, in micros (1,750,000 micros = 1.75).',
              format: 'uint64',
              type: 'string',
            },
            currency: {
              description: 'The currency in which the purchase was made.',
              type: 'string',
            },
            superStickerMetadata: {
              description: 'Information about the Super Sticker.',
              properties: {
                altText: {
                  description:
                    'Internationalized alt text that describes the sticker image and any animation associated with it.',
                  type: 'string',
                },
                altTextLanguage: {
                  description:
                    'Specifies the localization language in which the alt text is returned.',
                  type: 'string',
                },
                stickerId: {
                  description:
                    'Unique identifier of the Super Sticker. This is a shorter form of the alt_text that includes pack name and a recognizable characteristic of the sticker.',
                  type: 'string',
                },
              },
              type: 'object',
            },
            tier: {
              description:
                'The tier in which the amount belongs. Lower amounts belong to lower tiers. The lowest tier is 1.',
              format: 'uint32',
              type: 'integer',
            },
          },
          type: 'object',
        },
        textMessageDetails: {
          description:
            "Details about the text message, this is only set if the type is 'textMessageEvent'.",
          properties: {
            messageText: {
              description: "The user's message.",
              type: 'string',
            },
          },
          type: 'object',
        },
        type: {
          description:
            'The type of message, this will always be present, it determines the contents of the message as well as which fields will be present.',
          enum: [
            'invalidType',
            'textMessageEvent',
            'tombstone',
            'fanFundingEvent',
            'chatEndedEvent',
            'sponsorOnlyModeStartedEvent',
            'sponsorOnlyModeEndedEvent',
            'newSponsorEvent',
            'memberMilestoneChatEvent',
            'membershipGiftingEvent',
            'giftMembershipReceivedEvent',
            'messageDeletedEvent',
            'messageRetractedEvent',
            'userBannedEvent',
            'superChatEvent',
            'superStickerEvent',
          ],
          type: 'string',
        },
        userBannedDetails: {
          properties: {
            banDurationSeconds: {
              description:
                'The duration of the ban. This property is only present if the banType is temporary.',
              format: 'uint64',
              type: 'string',
            },
            banType: {
              description: 'The type of ban.',
              enum: ['permanent', 'temporary'],
              type: 'string',
            },
            bannedUserDetails: {
              properties: {
                channelId: {
                  description: 'The YouTube channel ID.',
                  type: 'string',
                },
                channelUrl: {
                  description: "The channel's URL.",
                  type: 'string',
                },
                displayName: {
                  description: "The channel's display name.",
                  type: 'string',
                },
                profileImageUrl: {
                  description: "The channels's avatar URL.",
                  type: 'string',
                },
              },
              type: 'object',
              description: 'The details of the user that was banned.',
            },
          },
          type: 'object',
        },
      },
      type: 'object',
    },
  },
  type: 'object',
};

function _validateResponse(
  value: unknown,
): YoutubeLiveChatMessagesInsertResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `YoutubeLiveChatMessagesInsert response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as YoutubeLiveChatMessagesInsertResponse;
}

export const YOUTUBE_LIVE_CHAT_MESSAGES_INSERT = new InjectionToken<
  (
    body:
      | YoutubeLiveChatMessagesInsertBody
      | Signal<YoutubeLiveChatMessagesInsertBody>,
  ) => ReturnType<typeof httpResource<YoutubeLiveChatMessagesInsertResponse>>
>('YOUTUBE_LIVE_CHAT_MESSAGES_INSERT');

export function provideYoutubeLiveChatMessagesInsert(): FactoryProvider {
  return {
    provide: YOUTUBE_LIVE_CHAT_MESSAGES_INSERT,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body:
          | YoutubeLiveChatMessagesInsertBody
          | Signal<YoutubeLiveChatMessagesInsertBody>,
      ) =>
        httpResource<YoutubeLiveChatMessagesInsertResponse>(
          () => ({
            url: `${base}/youtube/v3/liveChat/messages`,
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
