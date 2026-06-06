import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostAccountLinksBody = NonNullable<
  paths['/v1/account_links']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostAccountLinksResponse =
  paths['/v1/account_links']['post']['responses']['200']['content']['application/json'];

export const POST_ACCOUNT_LINKS = new InjectionToken<
  (
    body: PostAccountLinksBody | Signal<PostAccountLinksBody>,
  ) => ReturnType<typeof httpResource<PostAccountLinksResponse>>
>('POST_ACCOUNT_LINKS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (body: PostAccountLinksBody | Signal<PostAccountLinksBody>) =>
      httpResource<PostAccountLinksResponse>(() => ({
        url: `${base}/v1/account_links`,
        method: 'POST',
        body,
      }));
  },
});
