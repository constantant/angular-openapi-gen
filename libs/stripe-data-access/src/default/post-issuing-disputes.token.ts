import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostIssuingDisputesBody = NonNullable<
  paths['/v1/issuing/disputes']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostIssuingDisputesResponse =
  paths['/v1/issuing/disputes']['post']['responses']['200']['content']['application/json'];

export const POST_ISSUING_DISPUTES = new InjectionToken<
  (
    body: PostIssuingDisputesBody | Signal<PostIssuingDisputesBody>,
  ) => ReturnType<typeof httpResource<PostIssuingDisputesResponse>>
>('POST_ISSUING_DISPUTES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (body: PostIssuingDisputesBody | Signal<PostIssuingDisputesBody>) =>
      httpResource<PostIssuingDisputesResponse>(() => ({
        url: `${base}/v1/issuing/disputes`,
        method: 'POST',
        body,
      }));
  },
});
