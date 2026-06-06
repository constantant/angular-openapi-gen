import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetEntitlementsFeaturesParams =
  paths['/v1/entitlements/features']['get']['parameters']['query'];

export type GetEntitlementsFeaturesResponse =
  paths['/v1/entitlements/features']['get']['responses']['200']['content']['application/json'];

export const GET_ENTITLEMENTS_FEATURES = new InjectionToken<
  (
    params?:
      | GetEntitlementsFeaturesParams
      | (() => GetEntitlementsFeaturesParams | undefined),
  ) => ReturnType<typeof httpResource<GetEntitlementsFeaturesResponse>>
>('GET_ENTITLEMENTS_FEATURES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      params?:
        | GetEntitlementsFeaturesParams
        | (() => GetEntitlementsFeaturesParams | undefined),
    ) =>
      httpResource<GetEntitlementsFeaturesResponse>(() => ({
        url: `${base}/v1/entitlements/features`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
