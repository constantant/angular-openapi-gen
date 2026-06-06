import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTransfersIdReversalsBody = NonNullable<
  paths['/v1/transfers/{id}/reversals']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTransfersIdReversalsResponse =
  paths['/v1/transfers/{id}/reversals']['post']['responses']['200']['content']['application/json'];

export const POST_TRANSFERS_ID_REVERSALS = new InjectionToken<
  (
    id: string,
    body: PostTransfersIdReversalsBody | Signal<PostTransfersIdReversalsBody>,
  ) => ReturnType<typeof httpResource<PostTransfersIdReversalsResponse>>
>('POST_TRANSFERS_ID_REVERSALS');

export function providePostTransfersIdReversals(): FactoryProvider {
  return {
    provide: POST_TRANSFERS_ID_REVERSALS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        body:
          | PostTransfersIdReversalsBody
          | Signal<PostTransfersIdReversalsBody>,
      ) =>
        httpResource<PostTransfersIdReversalsResponse>(() => ({
          url: `${base}/v1/transfers/${id}/reversals`,
          method: 'POST',
          body,
        }));
    },
  };
}
