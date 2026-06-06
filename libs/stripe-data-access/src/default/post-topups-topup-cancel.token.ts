import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTopupsTopupCancelBody = NonNullable<
  paths['/v1/topups/{topup}/cancel']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTopupsTopupCancelResponse =
  paths['/v1/topups/{topup}/cancel']['post']['responses']['200']['content']['application/json'];

export const POST_TOPUPS_TOPUP_CANCEL = new InjectionToken<
  (
    topup: string,
    body: PostTopupsTopupCancelBody | Signal<PostTopupsTopupCancelBody>,
  ) => ReturnType<typeof httpResource<PostTopupsTopupCancelResponse>>
>('POST_TOPUPS_TOPUP_CANCEL');

export function providePostTopupsTopupCancel(): FactoryProvider {
  return {
    provide: POST_TOPUPS_TOPUP_CANCEL,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        topup: string,
        body: PostTopupsTopupCancelBody | Signal<PostTopupsTopupCancelBody>,
      ) =>
        httpResource<PostTopupsTopupCancelResponse>(() => ({
          url: `${base}/v1/topups/${topup}/cancel`,
          method: 'POST',
          body,
        }));
    },
  };
}
