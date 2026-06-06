import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetLinkedAccountsAccountOwnersParams =
  paths['/v1/linked_accounts/{account}/owners']['get']['parameters']['query'];

type GetLinkedAccountsAccountOwnersResponse =
  paths['/v1/linked_accounts/{account}/owners']['get']['responses']['200']['content']['application/json'];

export const GET_LINKED_ACCOUNTS_ACCOUNT_OWNERS = new InjectionToken<
  (
    account: string,
    params?: GetLinkedAccountsAccountOwnersParams,
  ) => ReturnType<typeof httpResource<GetLinkedAccountsAccountOwnersResponse>>
>('GET_LINKED_ACCOUNTS_ACCOUNT_OWNERS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (account: string, params?: GetLinkedAccountsAccountOwnersParams) =>
      httpResource<GetLinkedAccountsAccountOwnersResponse>(() => ({
        url: `${base}/v1/linked_accounts/${account}/owners`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
