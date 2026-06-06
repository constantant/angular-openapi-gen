import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTransfersTransferReversalsIdBody = NonNullable<
  paths['/v1/transfers/{transfer}/reversals/{id}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTransfersTransferReversalsIdResponse =
  paths['/v1/transfers/{transfer}/reversals/{id}']['post']['responses']['200']['content']['application/json'];

export const POST_TRANSFERS_TRANSFER_REVERSALS_ID = new InjectionToken<
  (
    id: string,
    transfer: string,
    body:
      | PostTransfersTransferReversalsIdBody
      | Signal<PostTransfersTransferReversalsIdBody>,
  ) => ReturnType<typeof httpResource<PostTransfersTransferReversalsIdResponse>>
>('POST_TRANSFERS_TRANSFER_REVERSALS_ID');

export function providePostTransfersTransferReversalsId(): FactoryProvider {
  return {
    provide: POST_TRANSFERS_TRANSFER_REVERSALS_ID,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        transfer: string,
        body:
          | PostTransfersTransferReversalsIdBody
          | Signal<PostTransfersTransferReversalsIdBody>,
      ) =>
        httpResource<PostTransfersTransferReversalsIdResponse>(() => ({
          url: `${base}/v1/transfers/${transfer}/reversals/${id}`,
          method: 'POST',
          body,
        }));
    },
  };
}
