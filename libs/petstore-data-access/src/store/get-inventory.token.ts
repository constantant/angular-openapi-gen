import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';
import { API_KEY } from '../api-key.security-token';

export type GetInventoryResponse =
  paths['/store/inventory']['get']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'object',
  additionalProperties: {
    type: 'integer',
    format: 'int32',
  },
};

function _validateResponse(value: unknown): GetInventoryResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `GetInventory response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as GetInventoryResponse;
}

export const GET_INVENTORY = new InjectionToken<
  () => ReturnType<typeof httpResource<GetInventoryResponse>>
>('GET_INVENTORY');

export function provideGetInventory(): FactoryProvider {
  return {
    provide: GET_INVENTORY,
    useFactory: () => {
      const base = inject(PETSTORE_BASE_URL);
      const apiKey = inject(API_KEY, { optional: true });
      return () =>
        httpResource<GetInventoryResponse>(
          () => ({
            url: `${base}/store/inventory`,
            headers: {
              ...(apiKey?.() != null ? { api_key: `${apiKey()}` } : {}),
            },
          }),
          { parse: _validateResponse },
        );
    },
  };
}
