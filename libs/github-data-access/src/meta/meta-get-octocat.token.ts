import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type MetaGetOctocatParams =
  paths['/octocat']['get']['parameters']['query'];

export const META_GET_OCTOCAT = new InjectionToken<
  (
    params?: MetaGetOctocatParams | (() => MetaGetOctocatParams | undefined),
  ) => ReturnType<typeof httpResource<unknown>>
>('META_GET_OCTOCAT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      params?: MetaGetOctocatParams | (() => MetaGetOctocatParams | undefined),
    ) =>
      httpResource<unknown>(() => ({
        url: `${base}/octocat`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
