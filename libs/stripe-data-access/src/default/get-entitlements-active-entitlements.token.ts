import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetEntitlementsActiveEntitlementsParams =
  paths['/v1/entitlements/active_entitlements']['get']['parameters']['query'];

type GetEntitlementsActiveEntitlementsResponse =
  paths['/v1/entitlements/active_entitlements']['get']['responses']['200']['content']['application/json'];

export const GET_ENTITLEMENTS_ACTIVE_ENTITLEMENTS = new InjectionToken<
  (
    params?: GetEntitlementsActiveEntitlementsParams,
  ) => ReturnType<
    typeof httpResource<GetEntitlementsActiveEntitlementsResponse>
  >
>('GET_ENTITLEMENTS_ACTIVE_ENTITLEMENTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetEntitlementsActiveEntitlementsParams) =>
      httpResource<GetEntitlementsActiveEntitlementsResponse>(() => ({
        url: `${base}/v1/entitlements/active_entitlements`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
