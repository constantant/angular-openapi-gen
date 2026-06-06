import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetIssuingTransactionsParams =
  paths['/v1/issuing/transactions']['get']['parameters']['query'];

type GetIssuingTransactionsResponse =
  paths['/v1/issuing/transactions']['get']['responses']['200']['content']['application/json'];

export const GET_ISSUING_TRANSACTIONS = new InjectionToken<
  (
    params?: GetIssuingTransactionsParams,
  ) => ReturnType<typeof httpResource<GetIssuingTransactionsResponse>>
>('GET_ISSUING_TRANSACTIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetIssuingTransactionsParams) =>
      httpResource<GetIssuingTransactionsResponse>(() => ({
        url: `${base}/v1/issuing/transactions`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
