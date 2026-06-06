import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

export type GetInventoryResponse =
  paths['/store/inventory']['get']['responses']['200']['content']['application/json'];

export const GET_INVENTORY = new InjectionToken<
  () => ReturnType<typeof httpResource<GetInventoryResponse>>
>('GET_INVENTORY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(PETSTORE_BASE_URL);
    return () =>
      httpResource<GetInventoryResponse>(() => ({
        url: `${base}/store/inventory`,
      }));
  },
});
