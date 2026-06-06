import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostDisputesDisputeCloseBody = NonNullable<
  paths['/v1/disputes/{dispute}/close']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostDisputesDisputeCloseResponse =
  paths['/v1/disputes/{dispute}/close']['post']['responses']['200']['content']['application/json'];

export const POST_DISPUTES_DISPUTE_CLOSE = new InjectionToken<
  (
    dispute: string,
    body: PostDisputesDisputeCloseBody | Signal<PostDisputesDisputeCloseBody>,
  ) => ReturnType<typeof httpResource<PostDisputesDisputeCloseResponse>>
>('POST_DISPUTES_DISPUTE_CLOSE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      dispute: string,
      body: PostDisputesDisputeCloseBody | Signal<PostDisputesDisputeCloseBody>,
    ) =>
      httpResource<PostDisputesDisputeCloseResponse>(() => ({
        url: `${base}/v1/disputes/${dispute}/close`,
        method: 'POST',
        body,
      }));
  },
});
