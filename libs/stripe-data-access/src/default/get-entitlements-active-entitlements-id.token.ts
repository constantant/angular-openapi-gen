import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetEntitlementsActiveEntitlementsIdParams =
  paths['/v1/entitlements/active_entitlements/{id}']['get']['parameters']['query'];

export type GetEntitlementsActiveEntitlementsIdResponse =
  paths['/v1/entitlements/active_entitlements/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_ENTITLEMENTS_ACTIVE_ENTITLEMENTS_ID = new InjectionToken<
  (
    id: string,
    params?:
      | GetEntitlementsActiveEntitlementsIdParams
      | (() => GetEntitlementsActiveEntitlementsIdParams | undefined),
  ) => ReturnType<
    typeof httpResource<GetEntitlementsActiveEntitlementsIdResponse>
  >
>('GET_ENTITLEMENTS_ACTIVE_ENTITLEMENTS_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      id: string,
      params?:
        | GetEntitlementsActiveEntitlementsIdParams
        | (() => GetEntitlementsActiveEntitlementsIdParams | undefined),
    ) =>
      httpResource<GetEntitlementsActiveEntitlementsIdResponse>(() => ({
        url: `${base}/v1/entitlements/active_entitlements/${id}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
