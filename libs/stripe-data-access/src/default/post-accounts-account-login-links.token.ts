import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostAccountsAccountLoginLinksBody = NonNullable<
  paths['/v1/accounts/{account}/login_links']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostAccountsAccountLoginLinksResponse =
  paths['/v1/accounts/{account}/login_links']['post']['responses']['200']['content']['application/json'];

export const POST_ACCOUNTS_ACCOUNT_LOGIN_LINKS = new InjectionToken<
  (
    account: string,
    body:
      | PostAccountsAccountLoginLinksBody
      | Signal<PostAccountsAccountLoginLinksBody>,
  ) => ReturnType<typeof httpResource<PostAccountsAccountLoginLinksResponse>>
>('POST_ACCOUNTS_ACCOUNT_LOGIN_LINKS');

export function providePostAccountsAccountLoginLinks(): FactoryProvider {
  return {
    provide: POST_ACCOUNTS_ACCOUNT_LOGIN_LINKS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        account: string,
        body:
          | PostAccountsAccountLoginLinksBody
          | Signal<PostAccountsAccountLoginLinksBody>,
      ) =>
        httpResource<PostAccountsAccountLoginLinksResponse>(() => ({
          url: `${base}/v1/accounts/${account}/login_links`,
          method: 'POST',
          body,
        }));
    },
  };
}
