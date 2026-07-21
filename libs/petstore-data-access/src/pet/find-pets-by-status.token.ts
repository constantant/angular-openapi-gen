import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';
import { PETSTORE_AUTH } from '../petstore-auth.security-token';

export type FindPetsByStatusParams =
  paths['/pet/findByStatus']['get']['parameters']['query'];

export type FindPetsByStatusResponse =
  paths['/pet/findByStatus']['get']['responses']['200']['content']['application/json'];

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

function _validateResponse(value: unknown): FindPetsByStatusResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `FindPetsByStatus response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as FindPetsByStatusResponse;
}

export const FIND_PETS_BY_STATUS = new InjectionToken<
  (
    params?:
      FindPetsByStatusParams | (() => FindPetsByStatusParams | undefined),
  ) => ReturnType<typeof httpResource<FindPetsByStatusResponse>>
>('FIND_PETS_BY_STATUS');

export function provideFindPetsByStatus(): FactoryProvider {
  return {
    provide: FIND_PETS_BY_STATUS,
    useFactory: () => {
      const base = inject(PETSTORE_BASE_URL);
      const petstoreAuth = inject(PETSTORE_AUTH, { optional: true });
      return (
        params?:
          FindPetsByStatusParams | (() => FindPetsByStatusParams | undefined),
      ) =>
        httpResource<FindPetsByStatusResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/pet/findByStatus`,
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
              },
            };
          },
          { parse: _validateResponse },
        );
    },
  };
}
