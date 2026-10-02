import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, type Observable } from 'rxjs';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { splitCallOptions, type CallOptions } from '../request-options';
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

export type GetInventoryFn = (
  options?: CallOptions,
) => Observable<GetInventoryResponse>;

export const GET_INVENTORY = new InjectionToken<GetInventoryFn>(
  'GET_INVENTORY',
);

export function provideGetInventory(): FactoryProvider {
  return {
    provide: GET_INVENTORY,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(PETSTORE_BASE_URL);
      const apiKey = inject(API_KEY, { optional: true });
      return (options?: CallOptions) => {
        const _opts = splitCallOptions(options);
        return http
          .request<GetInventoryResponse>('GET', `${base}/store/inventory`, {
            ..._opts.request,
            headers: {
              ...(apiKey?.() != null ? { api_key: `${apiKey()}` } : {}),
              ..._opts.headers,
            },
          })
          .pipe(map(_validateResponse));
      };
    },
  };
}
