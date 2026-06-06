import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostEntitlementsFeaturesBody = NonNullable<
  paths['/v1/entitlements/features']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostEntitlementsFeaturesResponse =
  paths['/v1/entitlements/features']['post']['responses']['200']['content']['application/json'];

export const POST_ENTITLEMENTS_FEATURES = new InjectionToken<
  (
    body: PostEntitlementsFeaturesBody | Signal<PostEntitlementsFeaturesBody>,
  ) => ReturnType<typeof httpResource<PostEntitlementsFeaturesResponse>>
>('POST_ENTITLEMENTS_FEATURES');

export function providePostEntitlementsFeatures(): FactoryProvider {
  return {
    provide: POST_ENTITLEMENTS_FEATURES,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        body:
          | PostEntitlementsFeaturesBody
          | Signal<PostEntitlementsFeaturesBody>,
      ) =>
        httpResource<PostEntitlementsFeaturesResponse>(() => ({
          url: `${base}/v1/entitlements/features`,
          method: 'POST',
          body,
        }));
    },
  };
}
