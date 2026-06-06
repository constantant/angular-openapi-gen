import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type GistsListCommitsParams =
  paths['/gists/{gist_id}/commits']['get']['parameters']['query'];

export type GistsListCommitsResponse =
  paths['/gists/{gist_id}/commits']['get']['responses']['200']['content']['application/json'];

export const GISTS_LIST_COMMITS = new InjectionToken<
  (
    gistId: string,
    params?:
      | GistsListCommitsParams
      | (() => GistsListCommitsParams | undefined),
  ) => ReturnType<typeof httpResource<GistsListCommitsResponse>>
>('GISTS_LIST_COMMITS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      gistId: string,
      params?:
        | GistsListCommitsParams
        | (() => GistsListCommitsParams | undefined),
    ) =>
      httpResource<GistsListCommitsResponse>(() => ({
        url: `${base}/gists/${gistId}/commits`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
