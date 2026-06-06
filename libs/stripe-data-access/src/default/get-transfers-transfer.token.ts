import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTransfersTransferParams =
  paths['/v1/transfers/{transfer}']['get']['parameters']['query'];

export type GetTransfersTransferResponse =
  paths['/v1/transfers/{transfer}']['get']['responses']['200']['content']['application/json'];

export const GET_TRANSFERS_TRANSFER = new InjectionToken<
  (
    transfer: string,
    params?:
      | GetTransfersTransferParams
      | (() => GetTransfersTransferParams | undefined),
  ) => ReturnType<typeof httpResource<GetTransfersTransferResponse>>
>('GET_TRANSFERS_TRANSFER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      transfer: string,
      params?:
        | GetTransfersTransferParams
        | (() => GetTransfersTransferParams | undefined),
    ) =>
      httpResource<GetTransfersTransferResponse>(() => ({
        url: `${base}/v1/transfers/${transfer}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
