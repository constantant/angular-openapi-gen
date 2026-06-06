import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTransfersBody = NonNullable<
  paths['/v1/transfers']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTransfersResponse =
  paths['/v1/transfers']['post']['responses']['200']['content']['application/json'];

export const POST_TRANSFERS = new InjectionToken<
  (
    body: PostTransfersBody | Signal<PostTransfersBody>,
  ) => ReturnType<typeof httpResource<PostTransfersResponse>>
>('POST_TRANSFERS');

export function providePostTransfers(): FactoryProvider {
  return {
    provide: POST_TRANSFERS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (body: PostTransfersBody | Signal<PostTransfersBody>) =>
        httpResource<PostTransfersResponse>(() => ({
          url: `${base}/v1/transfers`,
          method: 'POST',
          body,
        }));
    },
  };
}
