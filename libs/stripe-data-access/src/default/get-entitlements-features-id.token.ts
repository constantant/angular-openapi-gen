import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetEntitlementsFeaturesIdParams =
  paths['/v1/entitlements/features/{id}']['get']['parameters']['query'];

export type GetEntitlementsFeaturesIdResponse =
  paths['/v1/entitlements/features/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_ENTITLEMENTS_FEATURES_ID = new InjectionToken<
  (
    id: string,
    params?:
      | GetEntitlementsFeaturesIdParams
      | (() => GetEntitlementsFeaturesIdParams | undefined),
  ) => ReturnType<typeof httpResource<GetEntitlementsFeaturesIdResponse>>
>('GET_ENTITLEMENTS_FEATURES_ID');

export function provideGetEntitlementsFeaturesId(): FactoryProvider {
  return {
    provide: GET_ENTITLEMENTS_FEATURES_ID,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        params?:
          | GetEntitlementsFeaturesIdParams
          | (() => GetEntitlementsFeaturesIdParams | undefined),
      ) =>
        httpResource<GetEntitlementsFeaturesIdResponse>(() => ({
          url: `${base}/v1/entitlements/features/${id}`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
