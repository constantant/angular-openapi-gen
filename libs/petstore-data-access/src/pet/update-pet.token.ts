import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
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

export type UpdatePetBody = NonNullable<
  paths['/pet']['put']['requestBody']
>['content']['application/json'];

export type UpdatePetResponse =
  paths['/pet']['put']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
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
};

function _validateResponse(value: unknown): UpdatePetResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `UpdatePet response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as UpdatePetResponse;
}

export type UpdatePetOptions = ResourceCallOptions<UpdatePetResponse>;

export type UpdatePetFn = <O extends UpdatePetOptions = UpdatePetOptions>(
  body: UpdatePetBody | Signal<UpdatePetBody>,
  options?: O,
) => ResourceRefFor<UpdatePetResponse, O>;

export const UPDATE_PET = new InjectionToken<UpdatePetFn>('UPDATE_PET');

export function provideUpdatePet(): FactoryProvider {
  return {
    provide: UPDATE_PET,
    useFactory: () => {
      const base = inject(PETSTORE_BASE_URL);
      const petstoreAuth = inject(PETSTORE_AUTH, { optional: true });
      return ((
        body: UpdatePetBody | Signal<UpdatePetBody>,
        options?: UpdatePetOptions,
      ) => {
        const _opts = splitCallOptions<UpdatePetResponse>(options);
        return httpResource<UpdatePetResponse>(
          () => {
            const _body =
              typeof body === 'function'
                ? (body as Signal<UpdatePetBody>)()
                : body;
            return {
              ..._opts.request,
              url: `${base}/pet`,
              method: 'PUT',
              body: _body,
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
      }) as UpdatePetFn;
    },
  };
}
