import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostEntitlementsFeaturesIdBody = NonNullable<
  paths['/v1/entitlements/features/{id}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostEntitlementsFeaturesIdResponse =
  paths['/v1/entitlements/features/{id}']['post']['responses']['200']['content']['application/json'];

export const POST_ENTITLEMENTS_FEATURES_ID = new InjectionToken<
  (
    id: string,
    body:
      | PostEntitlementsFeaturesIdBody
      | Signal<PostEntitlementsFeaturesIdBody>,
  ) => ReturnType<typeof httpResource<PostEntitlementsFeaturesIdResponse>>
>('POST_ENTITLEMENTS_FEATURES_ID');

export function providePostEntitlementsFeaturesId(): FactoryProvider {
  return {
    provide: POST_ENTITLEMENTS_FEATURES_ID,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        body:
          | PostEntitlementsFeaturesIdBody
          | Signal<PostEntitlementsFeaturesIdBody>,
      ) =>
        httpResource<PostEntitlementsFeaturesIdResponse>(() => ({
          url: `${base}/v1/entitlements/features/${id}`,
          method: 'POST',
          body,
        }));
    },
  };
}
