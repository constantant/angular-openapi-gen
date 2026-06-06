import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostFileLinksBody = NonNullable<
  paths['/v1/file_links']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostFileLinksResponse =
  paths['/v1/file_links']['post']['responses']['200']['content']['application/json'];

export const POST_FILE_LINKS = new InjectionToken<
  (
    body: PostFileLinksBody | Signal<PostFileLinksBody>,
  ) => ReturnType<typeof httpResource<PostFileLinksResponse>>
>('POST_FILE_LINKS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (body: PostFileLinksBody | Signal<PostFileLinksBody>) =>
      httpResource<PostFileLinksResponse>(() => ({
        url: `${base}/v1/file_links`,
        method: 'POST',
        body,
      }));
  },
});
