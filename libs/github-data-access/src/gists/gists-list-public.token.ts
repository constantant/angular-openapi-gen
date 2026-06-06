import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type GistsListPublicParams =
  paths['/gists/public']['get']['parameters']['query'];

export type GistsListPublicResponse =
  paths['/gists/public']['get']['responses']['200']['content']['application/json'];

export const GISTS_LIST_PUBLIC = new InjectionToken<
  (
    params?: GistsListPublicParams | (() => GistsListPublicParams | undefined),
  ) => ReturnType<typeof httpResource<GistsListPublicResponse>>
>('GISTS_LIST_PUBLIC', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      params?:
        | GistsListPublicParams
        | (() => GistsListPublicParams | undefined),
    ) =>
      httpResource<GistsListPublicResponse>(() => ({
        url: `${base}/gists/public`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
