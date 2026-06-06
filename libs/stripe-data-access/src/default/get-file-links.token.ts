import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetFileLinksParams =
  paths['/v1/file_links']['get']['parameters']['query'];

export type GetFileLinksResponse =
  paths['/v1/file_links']['get']['responses']['200']['content']['application/json'];

export const GET_FILE_LINKS = new InjectionToken<
  (
    params?: GetFileLinksParams | (() => GetFileLinksParams | undefined),
  ) => ReturnType<typeof httpResource<GetFileLinksResponse>>
>('GET_FILE_LINKS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      params?: GetFileLinksParams | (() => GetFileLinksParams | undefined),
    ) =>
      httpResource<GetFileLinksResponse>(() => ({
        url: `${base}/v1/file_links`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
