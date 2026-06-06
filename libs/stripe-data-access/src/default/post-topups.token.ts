import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTopupsBody = NonNullable<
  paths['/v1/topups']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTopupsResponse =
  paths['/v1/topups']['post']['responses']['200']['content']['application/json'];

export const POST_TOPUPS = new InjectionToken<
  (
    body: PostTopupsBody | Signal<PostTopupsBody>,
  ) => ReturnType<typeof httpResource<PostTopupsResponse>>
>('POST_TOPUPS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (body: PostTopupsBody | Signal<PostTopupsBody>) =>
      httpResource<PostTopupsResponse>(() => ({
        url: `${base}/v1/topups`,
        method: 'POST',
        body,
      }));
  },
});
