import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTransfersTransferBody = NonNullable<
  paths['/v1/transfers/{transfer}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTransfersTransferResponse =
  paths['/v1/transfers/{transfer}']['post']['responses']['200']['content']['application/json'];

export const POST_TRANSFERS_TRANSFER = new InjectionToken<
  (
    transfer: string,
    body: PostTransfersTransferBody | Signal<PostTransfersTransferBody>,
  ) => ReturnType<typeof httpResource<PostTransfersTransferResponse>>
>('POST_TRANSFERS_TRANSFER');

export function providePostTransfersTransfer(): FactoryProvider {
  return {
    provide: POST_TRANSFERS_TRANSFER,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        transfer: string,
        body: PostTransfersTransferBody | Signal<PostTransfersTransferBody>,
      ) =>
        httpResource<PostTransfersTransferResponse>(() => ({
          url: `${base}/v1/transfers/${transfer}`,
          method: 'POST',
          body,
        }));
    },
  };
}
