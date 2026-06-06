import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetTransfersTransferReversalsIdParams =
  paths['/v1/transfers/{transfer}/reversals/{id}']['get']['parameters']['query'];

type GetTransfersTransferReversalsIdResponse =
  paths['/v1/transfers/{transfer}/reversals/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_TRANSFERS_TRANSFER_REVERSALS_ID = new InjectionToken<
  (
    id: string,
    transfer: string,
    params?: GetTransfersTransferReversalsIdParams,
  ) => ReturnType<typeof httpResource<GetTransfersTransferReversalsIdResponse>>
>('GET_TRANSFERS_TRANSFER_REVERSALS_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      id: string,
      transfer: string,
      params?: GetTransfersTransferReversalsIdParams,
    ) =>
      httpResource<GetTransfersTransferReversalsIdResponse>(() => ({
        url: `${base}/v1/transfers/${transfer}/reversals/${id}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
