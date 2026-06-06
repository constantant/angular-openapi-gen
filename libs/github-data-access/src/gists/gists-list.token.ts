import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type GistsListParams = paths['/gists']['get']['parameters']['query'];

export type GistsListResponse =
  paths['/gists']['get']['responses']['200']['content']['application/json'];

export const GISTS_LIST = new InjectionToken<
  (
    params?: GistsListParams | (() => GistsListParams | undefined),
  ) => ReturnType<typeof httpResource<GistsListResponse>>
>('GISTS_LIST', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (params?: GistsListParams | (() => GistsListParams | undefined)) =>
      httpResource<GistsListResponse>(() => ({
        url: `${base}/gists`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
