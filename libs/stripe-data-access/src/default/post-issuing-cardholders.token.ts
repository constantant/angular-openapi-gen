import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostIssuingCardholdersBody = NonNullable<
  paths['/v1/issuing/cardholders']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostIssuingCardholdersResponse =
  paths['/v1/issuing/cardholders']['post']['responses']['200']['content']['application/json'];

export const POST_ISSUING_CARDHOLDERS = new InjectionToken<
  (
    body: PostIssuingCardholdersBody | Signal<PostIssuingCardholdersBody>,
  ) => ReturnType<typeof httpResource<PostIssuingCardholdersResponse>>
>('POST_ISSUING_CARDHOLDERS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      body: PostIssuingCardholdersBody | Signal<PostIssuingCardholdersBody>,
    ) =>
      httpResource<PostIssuingCardholdersResponse>(() => ({
        url: `${base}/v1/issuing/cardholders`,
        method: 'POST',
        body,
      }));
  },
});
