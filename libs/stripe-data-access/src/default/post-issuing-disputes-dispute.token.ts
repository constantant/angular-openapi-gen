import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostIssuingDisputesDisputeBody = NonNullable<
  paths['/v1/issuing/disputes/{dispute}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostIssuingDisputesDisputeResponse =
  paths['/v1/issuing/disputes/{dispute}']['post']['responses']['200']['content']['application/json'];

export const POST_ISSUING_DISPUTES_DISPUTE = new InjectionToken<
  (
    dispute: string,
    body:
      | PostIssuingDisputesDisputeBody
      | Signal<PostIssuingDisputesDisputeBody>,
  ) => ReturnType<typeof httpResource<PostIssuingDisputesDisputeResponse>>
>('POST_ISSUING_DISPUTES_DISPUTE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      dispute: string,
      body:
        | PostIssuingDisputesDisputeBody
        | Signal<PostIssuingDisputesDisputeBody>,
    ) =>
      httpResource<PostIssuingDisputesDisputeResponse>(() => ({
        url: `${base}/v1/issuing/disputes/${dispute}`,
        method: 'POST',
        body,
      }));
  },
});
