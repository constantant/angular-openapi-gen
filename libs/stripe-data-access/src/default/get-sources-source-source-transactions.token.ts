import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetSourcesSourceSourceTransactionsParams =
  paths['/v1/sources/{source}/source_transactions']['get']['parameters']['query'];

type GetSourcesSourceSourceTransactionsResponse =
  paths['/v1/sources/{source}/source_transactions']['get']['responses']['200']['content']['application/json'];

export const GET_SOURCES_SOURCE_SOURCE_TRANSACTIONS = new InjectionToken<
  (
    source: string,
    params?: GetSourcesSourceSourceTransactionsParams,
  ) => ReturnType<
    typeof httpResource<GetSourcesSourceSourceTransactionsResponse>
  >
>('GET_SOURCES_SOURCE_SOURCE_TRANSACTIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      source: string,
      params?: GetSourcesSourceSourceTransactionsParams,
    ) =>
      httpResource<GetSourcesSourceSourceTransactionsResponse>(() => ({
        url: `${base}/v1/sources/${source}/source_transactions`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
