import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type GistsListForksParams =
  paths['/gists/{gist_id}/forks']['get']['parameters']['query'];

export type GistsListForksResponse =
  paths['/gists/{gist_id}/forks']['get']['responses']['200']['content']['application/json'];

export const GISTS_LIST_FORKS = new InjectionToken<
  (
    gistId: string,
    params?: GistsListForksParams | (() => GistsListForksParams | undefined),
  ) => ReturnType<typeof httpResource<GistsListForksResponse>>
>('GISTS_LIST_FORKS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      gistId: string,
      params?: GistsListForksParams | (() => GistsListForksParams | undefined),
    ) =>
      httpResource<GistsListForksResponse>(() => ({
        url: `${base}/gists/${gistId}/forks`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
