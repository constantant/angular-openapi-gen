import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostTopupsTopupBody = NonNullable<
  paths['/v1/topups/{topup}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostTopupsTopupResponse =
  paths['/v1/topups/{topup}']['post']['responses']['200']['content']['application/json'];

export const POST_TOPUPS_TOPUP = new InjectionToken<
  (
    topup: string,
    body: PostTopupsTopupBody | Signal<PostTopupsTopupBody>,
  ) => ReturnType<typeof httpResource<PostTopupsTopupResponse>>
>('POST_TOPUPS_TOPUP', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      topup: string,
      body: PostTopupsTopupBody | Signal<PostTopupsTopupBody>,
    ) =>
      httpResource<PostTopupsTopupResponse>(() => ({
        url: `${base}/v1/topups/${topup}`,
        method: 'POST',
        body,
      }));
  },
});
