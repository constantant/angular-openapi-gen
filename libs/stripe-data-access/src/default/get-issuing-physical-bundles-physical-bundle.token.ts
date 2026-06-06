import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetIssuingPhysicalBundlesPhysicalBundleParams =
  paths['/v1/issuing/physical_bundles/{physical_bundle}']['get']['parameters']['query'];

export type GetIssuingPhysicalBundlesPhysicalBundleResponse =
  paths['/v1/issuing/physical_bundles/{physical_bundle}']['get']['responses']['200']['content']['application/json'];

export const GET_ISSUING_PHYSICAL_BUNDLES_PHYSICAL_BUNDLE = new InjectionToken<
  (
    physicalBundle: string,
    params?:
      | GetIssuingPhysicalBundlesPhysicalBundleParams
      | (() => GetIssuingPhysicalBundlesPhysicalBundleParams | undefined),
  ) => ReturnType<
    typeof httpResource<GetIssuingPhysicalBundlesPhysicalBundleResponse>
  >
>('GET_ISSUING_PHYSICAL_BUNDLES_PHYSICAL_BUNDLE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      physicalBundle: string,
      params?:
        | GetIssuingPhysicalBundlesPhysicalBundleParams
        | (() => GetIssuingPhysicalBundlesPhysicalBundleParams | undefined),
    ) =>
      httpResource<GetIssuingPhysicalBundlesPhysicalBundleResponse>(() => ({
        url: `${base}/v1/issuing/physical_bundles/${physicalBundle}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
