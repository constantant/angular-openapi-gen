import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetLinkedAccountsParams =
  paths['/v1/linked_accounts']['get']['parameters']['query'];

type GetLinkedAccountsResponse =
  paths['/v1/linked_accounts']['get']['responses']['200']['content']['application/json'];

export const GET_LINKED_ACCOUNTS = new InjectionToken<
  (
    params?: GetLinkedAccountsParams,
  ) => ReturnType<typeof httpResource<GetLinkedAccountsResponse>>
>('GET_LINKED_ACCOUNTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetLinkedAccountsParams) =>
      httpResource<GetLinkedAccountsResponse>(() => ({
        url: `${base}/v1/linked_accounts`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
