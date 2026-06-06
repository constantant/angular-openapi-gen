import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostFileLinksLinkBody = NonNullable<
  paths['/v1/file_links/{link}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostFileLinksLinkResponse =
  paths['/v1/file_links/{link}']['post']['responses']['200']['content']['application/json'];

export const POST_FILE_LINKS_LINK = new InjectionToken<
  (
    link: string,
    body: PostFileLinksLinkBody | Signal<PostFileLinksLinkBody>,
  ) => ReturnType<typeof httpResource<PostFileLinksLinkResponse>>
>('POST_FILE_LINKS_LINK', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      link: string,
      body: PostFileLinksLinkBody | Signal<PostFileLinksLinkBody>,
    ) =>
      httpResource<PostFileLinksLinkResponse>(() => ({
        url: `${base}/v1/file_links/${link}`,
        method: 'POST',
        body,
      }));
  },
});
