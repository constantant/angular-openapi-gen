import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostAccountsBody = NonNullable<
  paths['/v1/accounts']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostAccountsResponse =
  paths['/v1/accounts']['post']['responses']['200']['content']['application/json'];

export const POST_ACCOUNTS = new InjectionToken<
  (
    body: PostAccountsBody | Signal<PostAccountsBody>,
  ) => ReturnType<typeof httpResource<PostAccountsResponse>>
>('POST_ACCOUNTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (body: PostAccountsBody | Signal<PostAccountsBody>) =>
      httpResource<PostAccountsResponse>(() => ({
        url: `${base}/v1/accounts`,
        method: 'POST',
        body,
      }));
  },
});
