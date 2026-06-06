import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetIssuingPhysicalBundlesParams =
  paths['/v1/issuing/physical_bundles']['get']['parameters']['query'];

export type GetIssuingPhysicalBundlesResponse =
  paths['/v1/issuing/physical_bundles']['get']['responses']['200']['content']['application/json'];

export const GET_ISSUING_PHYSICAL_BUNDLES = new InjectionToken<
  (
    params?:
      | GetIssuingPhysicalBundlesParams
      | (() => GetIssuingPhysicalBundlesParams | undefined),
  ) => ReturnType<typeof httpResource<GetIssuingPhysicalBundlesResponse>>
>('GET_ISSUING_PHYSICAL_BUNDLES');

export function provideGetIssuingPhysicalBundles(): FactoryProvider {
  return {
    provide: GET_ISSUING_PHYSICAL_BUNDLES,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetIssuingPhysicalBundlesParams
          | (() => GetIssuingPhysicalBundlesParams | undefined),
      ) =>
        httpResource<GetIssuingPhysicalBundlesResponse>(() => ({
          url: `${base}/v1/issuing/physical_bundles`,
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
