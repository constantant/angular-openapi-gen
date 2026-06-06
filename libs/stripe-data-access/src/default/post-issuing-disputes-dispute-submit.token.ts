import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostIssuingDisputesDisputeSubmitBody = NonNullable<
  paths['/v1/issuing/disputes/{dispute}/submit']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostIssuingDisputesDisputeSubmitResponse =
  paths['/v1/issuing/disputes/{dispute}/submit']['post']['responses']['200']['content']['application/json'];

export const POST_ISSUING_DISPUTES_DISPUTE_SUBMIT = new InjectionToken<
  (
    dispute: string,
    body:
      | PostIssuingDisputesDisputeSubmitBody
      | Signal<PostIssuingDisputesDisputeSubmitBody>,
  ) => ReturnType<typeof httpResource<PostIssuingDisputesDisputeSubmitResponse>>
>('POST_ISSUING_DISPUTES_DISPUTE_SUBMIT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      dispute: string,
      body:
        | PostIssuingDisputesDisputeSubmitBody
        | Signal<PostIssuingDisputesDisputeSubmitBody>,
    ) =>
      httpResource<PostIssuingDisputesDisputeSubmitResponse>(() => ({
        url: `${base}/v1/issuing/disputes/${dispute}/submit`,
        method: 'POST',
        body,
      }));
  },
});
