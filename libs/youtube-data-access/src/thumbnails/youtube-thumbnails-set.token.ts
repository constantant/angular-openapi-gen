import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeThumbnailsSetResponse =
  paths['/youtube/v3/thumbnails/set']['post']['responses']['200']['content']['application/json'];

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
      description: 'A list of thumbnails.',
      items: {
        description:
          'Internal representation of thumbnails for a YouTube resource.',
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
      type: 'array',
    },
    kind: {
      default: 'youtube#thumbnailSetResponse',
      description:
        'Identifies what kind of resource this is. Value: the fixed string "youtube#thumbnailSetResponse".',
      type: 'string',
    },
    visitorId: {
      description: 'The visitorId identifies the visitor.',
      type: 'string',
    },
  },
  type: 'object',
};

function _validateResponse(value: unknown): YoutubeThumbnailsSetResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `YoutubeThumbnailsSet response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as YoutubeThumbnailsSetResponse;
}

export const YOUTUBE_THUMBNAILS_SET = new InjectionToken<
  () => ReturnType<typeof httpResource<YoutubeThumbnailsSetResponse>>
>('YOUTUBE_THUMBNAILS_SET');

export function provideYoutubeThumbnailsSet(): FactoryProvider {
  return {
    provide: YOUTUBE_THUMBNAILS_SET,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return () =>
        httpResource<YoutubeThumbnailsSetResponse>(
          () => ({
            url: `${base}/youtube/v3/thumbnails/set`,
            method: 'POST',
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
