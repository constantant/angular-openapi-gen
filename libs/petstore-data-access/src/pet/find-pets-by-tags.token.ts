import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import {
  splitCallOptions,
  type ResourceCallOptions,
  type ResourceRefFor,
} from '../request-options';
import { PETSTORE_BASE_URL } from '../api-base-url.token';
import { PETSTORE_AUTH } from '../petstore-auth.security-token';

export type FindPetsByTagsParams =
  paths['/pet/findByTags']['get']['parameters']['query'];

export type FindPetsByTagsResponse =
  paths['/pet/findByTags']['get']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'array',
  items: {
    required: ['name', 'photoUrls'],
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        format: 'int64',
        example: 10,
      },
      name: {
        type: 'string',
        example: 'doggie',
      },
      category: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
            example: 1,
          },
          name: {
            type: 'string',
            example: 'Dogs',
          },
        },
        xml: {
          name: 'category',
        },
      },
      photoUrls: {
        type: 'array',
        xml: {
          wrapped: true,
        },
        items: {
          type: 'string',
          xml: {
            name: 'photoUrl',
          },
        },
      },
      tags: {
        type: 'array',
        xml: {
          wrapped: true,
        },
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
            },
            name: {
              type: 'string',
            },
          },
          xml: {
            name: 'tag',
          },
        },
      },
      status: {
        type: 'string',
        description: 'pet status in the store',
        enum: ['available', 'pending', 'sold'],
      },
    },
    xml: {
      name: 'pet',
    },
  },
};

function _validateResponse(value: unknown): FindPetsByTagsResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `FindPetsByTags response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as FindPetsByTagsResponse;
}

export type FindPetsByTagsOptions = ResourceCallOptions<FindPetsByTagsResponse>;

export type FindPetsByTagsFn = <
  O extends FindPetsByTagsOptions = FindPetsByTagsOptions,
>(
  params?: FindPetsByTagsParams | (() => FindPetsByTagsParams | undefined),
  options?: O,
) => ResourceRefFor<FindPetsByTagsResponse, O>;

export const FIND_PETS_BY_TAGS = new InjectionToken<FindPetsByTagsFn>(
  'FIND_PETS_BY_TAGS',
);

export function provideFindPetsByTags(): FactoryProvider {
  return {
    provide: FIND_PETS_BY_TAGS,
    useFactory: () => {
      const base = inject(PETSTORE_BASE_URL);
      const petstoreAuth = inject(PETSTORE_AUTH, { optional: true });
      return ((
        params?:
          FindPetsByTagsParams | (() => FindPetsByTagsParams | undefined),
        options?: FindPetsByTagsOptions,
      ) => {
        const _opts = splitCallOptions<FindPetsByTagsResponse>(options);
        return httpResource<FindPetsByTagsResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              ..._opts.request,
              url: `${base}/pet/findByTags`,
              params: _params as unknown as Record<
                string,
                | string
                | number
                | boolean
                | readonly (string | number | boolean)[]
              >,
              headers: {
                ...(petstoreAuth?.() != null
                  ? { Authorization: `Bearer ${petstoreAuth()}` }
                  : {}),
                ..._opts.headers,
              },
            };
          },
          { ..._opts.resource, parse: _validateResponse },
        );
      }) as FindPetsByTagsFn;
    },
  };
}
