import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostExternalAccountsIdBody = NonNullable<
  paths['/v1/external_accounts/{id}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostExternalAccountsIdResponse =
  paths['/v1/external_accounts/{id}']['post']['responses']['200']['content']['application/json'];

export const POST_EXTERNAL_ACCOUNTS_ID = new InjectionToken<
  (
    id: string,
    body: PostExternalAccountsIdBody | Signal<PostExternalAccountsIdBody>,
  ) => ReturnType<typeof httpResource<PostExternalAccountsIdResponse>>
>('POST_EXTERNAL_ACCOUNTS_ID');

export function providePostExternalAccountsId(): FactoryProvider {
  return {
    provide: POST_EXTERNAL_ACCOUNTS_ID,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        body: PostExternalAccountsIdBody | Signal<PostExternalAccountsIdBody>,
      ) =>
        httpResource<PostExternalAccountsIdResponse>(() => ({
          url: `${base}/v1/external_accounts/${id}`,
          method: 'POST',
          body,
        }));
    },
  };
}
