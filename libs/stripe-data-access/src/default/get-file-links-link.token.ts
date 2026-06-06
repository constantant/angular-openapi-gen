import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetFileLinksLinkParams =
  paths['/v1/file_links/{link}']['get']['parameters']['query'];

export type GetFileLinksLinkResponse =
  paths['/v1/file_links/{link}']['get']['responses']['200']['content']['application/json'];

export const GET_FILE_LINKS_LINK = new InjectionToken<
  (
    link: string,
    params?:
      | GetFileLinksLinkParams
      | (() => GetFileLinksLinkParams | undefined),
  ) => ReturnType<typeof httpResource<GetFileLinksLinkResponse>>
>('GET_FILE_LINKS_LINK');

export function provideGetFileLinksLink(): FactoryProvider {
  return {
    provide: GET_FILE_LINKS_LINK,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        link: string,
        params?:
          | GetFileLinksLinkParams
          | (() => GetFileLinksLinkParams | undefined),
      ) =>
        httpResource<GetFileLinksLinkResponse>(() => ({
          url: `${base}/v1/file_links/${link}`,
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
