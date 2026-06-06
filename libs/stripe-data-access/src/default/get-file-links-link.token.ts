import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetFileLinksLinkParams =
  paths['/v1/file_links/{link}']['get']['parameters']['query'];

type GetFileLinksLinkResponse =
  paths['/v1/file_links/{link}']['get']['responses']['200']['content']['application/json'];

export const GET_FILE_LINKS_LINK = new InjectionToken<
  (
    link: string,
    params?: GetFileLinksLinkParams,
  ) => ReturnType<typeof httpResource<GetFileLinksLinkResponse>>
>('GET_FILE_LINKS_LINK', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (link: string, params?: GetFileLinksLinkParams) =>
      httpResource<GetFileLinksLinkResponse>(() => ({
        url: `${base}/v1/file_links/${link}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
