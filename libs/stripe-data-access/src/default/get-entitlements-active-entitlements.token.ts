import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetEntitlementsActiveEntitlementsParams =
  paths['/v1/entitlements/active_entitlements']['get']['parameters']['query'];

export type GetEntitlementsActiveEntitlementsResponse =
  paths['/v1/entitlements/active_entitlements']['get']['responses']['200']['content']['application/json'];

export const GET_ENTITLEMENTS_ACTIVE_ENTITLEMENTS = new InjectionToken<
  (
    params?:
      | GetEntitlementsActiveEntitlementsParams
      | (() => GetEntitlementsActiveEntitlementsParams | undefined),
  ) => ReturnType<
    typeof httpResource<GetEntitlementsActiveEntitlementsResponse>
  >
>('GET_ENTITLEMENTS_ACTIVE_ENTITLEMENTS');

export function provideGetEntitlementsActiveEntitlements(): FactoryProvider {
  return {
    provide: GET_ENTITLEMENTS_ACTIVE_ENTITLEMENTS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetEntitlementsActiveEntitlementsParams
          | (() => GetEntitlementsActiveEntitlementsParams | undefined),
      ) =>
        httpResource<GetEntitlementsActiveEntitlementsResponse>(() => ({
          url: `${base}/v1/entitlements/active_entitlements`,
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
