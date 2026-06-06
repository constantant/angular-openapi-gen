import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTreasuryOutboundTransfersParams =
  paths['/v1/treasury/outbound_transfers']['get']['parameters']['query'];

export type GetTreasuryOutboundTransfersResponse =
  paths['/v1/treasury/outbound_transfers']['get']['responses']['200']['content']['application/json'];

export const GET_TREASURY_OUTBOUND_TRANSFERS = new InjectionToken<
  (
    params?:
      | GetTreasuryOutboundTransfersParams
      | (() => GetTreasuryOutboundTransfersParams | undefined),
  ) => ReturnType<typeof httpResource<GetTreasuryOutboundTransfersResponse>>
>('GET_TREASURY_OUTBOUND_TRANSFERS');

export function provideGetTreasuryOutboundTransfers(): FactoryProvider {
  return {
    provide: GET_TREASURY_OUTBOUND_TRANSFERS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetTreasuryOutboundTransfersParams
          | (() => GetTreasuryOutboundTransfersParams | undefined),
      ) =>
        httpResource<GetTreasuryOutboundTransfersResponse>(() => ({
          url: `${base}/v1/treasury/outbound_transfers`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
