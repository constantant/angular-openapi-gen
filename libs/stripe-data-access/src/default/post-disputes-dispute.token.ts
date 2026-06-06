import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostDisputesDisputeBody = NonNullable<
  paths['/v1/disputes/{dispute}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostDisputesDisputeResponse =
  paths['/v1/disputes/{dispute}']['post']['responses']['200']['content']['application/json'];

export const POST_DISPUTES_DISPUTE = new InjectionToken<
  (
    dispute: string,
    body: PostDisputesDisputeBody | Signal<PostDisputesDisputeBody>,
  ) => ReturnType<typeof httpResource<PostDisputesDisputeResponse>>
>('POST_DISPUTES_DISPUTE');

export function providePostDisputesDispute(): FactoryProvider {
  return {
    provide: POST_DISPUTES_DISPUTE,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        dispute: string,
        body: PostDisputesDisputeBody | Signal<PostDisputesDisputeBody>,
      ) =>
        httpResource<PostDisputesDisputeResponse>(() => ({
          url: `${base}/v1/disputes/${dispute}`,
          method: 'POST',
          body,
        }));
    },
  };
}
