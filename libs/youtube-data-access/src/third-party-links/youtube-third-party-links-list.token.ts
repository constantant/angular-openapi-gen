import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';

export type YoutubeThirdPartyLinksListParams =
  paths['/youtube/v3/thirdPartyLinks']['get']['parameters']['query'];

export type YoutubeThirdPartyLinksListResponse =
  paths['/youtube/v3/thirdPartyLinks']['get']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  properties: {
    etag: {
      description: 'Etag of this resource.',
      type: 'string',
    },
    items: {
      items: {
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
      },
      type: 'array',
    },
    kind: {
      default: 'youtube#thirdPartyLinkListResponse',
      description:
        'Identifies what kind of resource this is. Value: the fixed string "youtube#thirdPartyLinkListResponse".',
      type: 'string',
    },
  },
  type: 'object',
};

function _validateResponse(value: unknown): YoutubeThirdPartyLinksListResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `YoutubeThirdPartyLinksList response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as YoutubeThirdPartyLinksListResponse;
}

export const YOUTUBE_THIRD_PARTY_LINKS_LIST = new InjectionToken<
  (
    params?:
      | YoutubeThirdPartyLinksListParams
      | (() => YoutubeThirdPartyLinksListParams | undefined),
  ) => ReturnType<typeof httpResource<YoutubeThirdPartyLinksListResponse>>
>('YOUTUBE_THIRD_PARTY_LINKS_LIST');

export function provideYoutubeThirdPartyLinksList(): FactoryProvider {
  return {
    provide: YOUTUBE_THIRD_PARTY_LINKS_LIST,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      return (
        params?:
          | YoutubeThirdPartyLinksListParams
          | (() => YoutubeThirdPartyLinksListParams | undefined),
      ) =>
        httpResource<YoutubeThirdPartyLinksListResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/youtube/v3/thirdPartyLinks`,
              params: _params as unknown as Record<
                string,
                | string
                | number
                | boolean
                | readonly (string | number | boolean)[]
              >,
            };
          },
          { parse: _validateResponse },
        );
    },
  };
}
