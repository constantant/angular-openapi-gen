import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetAccountsParams = paths['/v1/accounts']['get']['parameters']['query'];

type GetAccountsResponse =
  paths['/v1/accounts']['get']['responses']['200']['content']['application/json'];

export const GET_ACCOUNTS = new InjectionToken<
  (
    params?: GetAccountsParams,
  ) => ReturnType<typeof httpResource<GetAccountsResponse>>
>('GET_ACCOUNTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetAccountsParams) =>
      httpResource<GetAccountsResponse>(() => ({
        url: `${base}/v1/accounts`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
