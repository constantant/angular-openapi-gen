import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetTreasuryReceivedDebitsParams =
  paths['/v1/treasury/received_debits']['get']['parameters']['query'];

type GetTreasuryReceivedDebitsResponse =
  paths['/v1/treasury/received_debits']['get']['responses']['200']['content']['application/json'];

export const GET_TREASURY_RECEIVED_DEBITS = new InjectionToken<
  (
    params?: GetTreasuryReceivedDebitsParams,
  ) => ReturnType<typeof httpResource<GetTreasuryReceivedDebitsResponse>>
>('GET_TREASURY_RECEIVED_DEBITS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetTreasuryReceivedDebitsParams) =>
      httpResource<GetTreasuryReceivedDebitsResponse>(() => ({
        url: `${base}/v1/treasury/received_debits`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
