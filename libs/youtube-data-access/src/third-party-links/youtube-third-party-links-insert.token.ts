import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';

export type YoutubeThirdPartyLinksInsertBody = NonNullable<
  paths['/youtube/v3/thirdPartyLinks']['post']['requestBody']
>['content']['application/json'];

export type YoutubeThirdPartyLinksInsertResponse =
  paths['/youtube/v3/thirdPartyLinks']['post']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  description:
    'A *third party account link* resource represents a link between a YouTube account or a channel and an account on a third-party service.',
  properties: {
    etag: {
      description: 'Etag of this resource',
      type: 'string',
    },
    kind: {
      default: 'youtube#thirdPartyLink',
      description:
        'Identifies what kind of resource this is. Value: the fixed string "youtube#thirdPartyLink".',
      type: 'string',
    },
    linkingToken: {
      description:
        'The linking_token identifies a YouTube account and channel with which the third party account is linked.',
      type: 'string',
    },
    snippet: {
      description:
        'The snippet object contains basic details about the third- party account link.',
      properties: {
        channelToStoreLink: {
          description:
            'Information specific to a link between a channel and a store on a merchandising platform.',
          properties: {
            merchantId: {
              description: 'Google Merchant Center id of the store.',
              format: 'uint64',
              type: 'string',
            },
            storeName: {
              description: 'Name of the store.',
              type: 'string',
            },
            storeUrl: {
              description: 'Landing page of the store.',
              type: 'string',
            },
          },
          type: 'object',
        },
        type: {
          description:
            'Type of the link named after the entities that are being linked.',
          enum: ['linkUnspecified', 'channelToStoreLink'],
          type: 'string',
        },
      },
      type: 'object',
    },
    status: {
      description:
        'The status object contains information about the status of the link.',
      properties: {
        linkStatus: {
          enum: ['unknown', 'failed', 'pending', 'linked'],
          type: 'string',
        },
      },
      type: 'object',
    },
  },
  type: 'object',
};

function _validateResponse(
  value: unknown,
): YoutubeThirdPartyLinksInsertResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `YoutubeThirdPartyLinksInsert response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as YoutubeThirdPartyLinksInsertResponse;
}

export const YOUTUBE_THIRD_PARTY_LINKS_INSERT = new InjectionToken<
  (
    body:
      | YoutubeThirdPartyLinksInsertBody
      | Signal<YoutubeThirdPartyLinksInsertBody>,
  ) => ReturnType<typeof httpResource<YoutubeThirdPartyLinksInsertResponse>>
>('YOUTUBE_THIRD_PARTY_LINKS_INSERT');

export function provideYoutubeThirdPartyLinksInsert(): FactoryProvider {
  return {
    provide: YOUTUBE_THIRD_PARTY_LINKS_INSERT,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      return (
        body:
          | YoutubeThirdPartyLinksInsertBody
          | Signal<YoutubeThirdPartyLinksInsertBody>,
      ) =>
        httpResource<YoutubeThirdPartyLinksInsertResponse>(
          () => ({
            url: `${base}/youtube/v3/thirdPartyLinks`,
            method: 'POST',
            body,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
