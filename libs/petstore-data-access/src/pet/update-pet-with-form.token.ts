import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';
import { PETSTORE_AUTH } from '../petstore-auth.security-token';

export type UpdatePetWithFormResponse =
  paths['/pet/{petId}']['post']['responses']['200']['content']['application/json'];

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

function _validateResponse(value: unknown): UpdatePetWithFormResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `UpdatePetWithForm response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as UpdatePetWithFormResponse;
}

export const UPDATE_PET_WITH_FORM = new InjectionToken<
  (petId: string) => ReturnType<typeof httpResource<UpdatePetWithFormResponse>>
>('UPDATE_PET_WITH_FORM');

export function provideUpdatePetWithForm(): FactoryProvider {
  return {
    provide: UPDATE_PET_WITH_FORM,
    useFactory: () => {
      const base = inject(PETSTORE_BASE_URL);
      const petstoreAuth = inject(PETSTORE_AUTH, { optional: true });
      return (petId: string) =>
        httpResource<UpdatePetWithFormResponse>(
          () => ({
            url: `${base}/pet/${petId}`,
            method: 'POST',
            headers: {
              ...(petstoreAuth?.() != null
                ? { Authorization: `Bearer ${petstoreAuth()}` }
                : {}),
            },
          }),
          { parse: _validateResponse },
        );
    },
  };
}
