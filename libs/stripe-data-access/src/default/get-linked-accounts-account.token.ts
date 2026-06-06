import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetLinkedAccountsAccountParams =
  paths['/v1/linked_accounts/{account}']['get']['parameters']['query'];

export type GetLinkedAccountsAccountResponse =
  paths['/v1/linked_accounts/{account}']['get']['responses']['200']['content']['application/json'];

export const GET_LINKED_ACCOUNTS_ACCOUNT = new InjectionToken<
  (
    account: string,
    params?:
      | GetLinkedAccountsAccountParams
      | (() => GetLinkedAccountsAccountParams | undefined),
  ) => ReturnType<typeof httpResource<GetLinkedAccountsAccountResponse>>
>('GET_LINKED_ACCOUNTS_ACCOUNT');

export function provideGetLinkedAccountsAccount(): FactoryProvider {
  return {
    provide: GET_LINKED_ACCOUNTS_ACCOUNT,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        account: string,
        params?:
          | GetLinkedAccountsAccountParams
          | (() => GetLinkedAccountsAccountParams | undefined),
      ) =>
        httpResource<GetLinkedAccountsAccountResponse>(() => ({
          url: `${base}/v1/linked_accounts/${account}`,
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
