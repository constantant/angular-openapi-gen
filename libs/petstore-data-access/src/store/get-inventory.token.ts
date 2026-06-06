import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';
import { API_KEY } from '../api-key.security-token';

export type GetInventoryResponse =
  paths['/store/inventory']['get']['responses']['200']['content']['application/json'];

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
        httpResource<GetInventoryResponse>(() => ({
          url: `${base}/store/inventory`,
          headers: {
            ...(apiKey?.() != null ? { api_key: apiKey() } : {}),
          },
        }));
    },
  };
}
