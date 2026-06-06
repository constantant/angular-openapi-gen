import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetTreasuryOutboundPaymentsIdParams =
  paths['/v1/treasury/outbound_payments/{id}']['get']['parameters']['query'];

type GetTreasuryOutboundPaymentsIdResponse =
  paths['/v1/treasury/outbound_payments/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_TREASURY_OUTBOUND_PAYMENTS_ID = new InjectionToken<
  (
    id: string,
    params?: GetTreasuryOutboundPaymentsIdParams,
  ) => ReturnType<typeof httpResource<GetTreasuryOutboundPaymentsIdResponse>>
>('GET_TREASURY_OUTBOUND_PAYMENTS_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (id: string, params?: GetTreasuryOutboundPaymentsIdParams) =>
      httpResource<GetTreasuryOutboundPaymentsIdResponse>(() => ({
        url: `${base}/v1/treasury/outbound_payments/${id}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
