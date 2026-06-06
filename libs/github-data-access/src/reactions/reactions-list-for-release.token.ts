import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReactionsListForReleaseParams =
  paths['/repos/{owner}/{repo}/releases/{release_id}/reactions']['get']['parameters']['query'];

export type ReactionsListForReleaseResponse =
  paths['/repos/{owner}/{repo}/releases/{release_id}/reactions']['get']['responses']['200']['content']['application/json'];

export const REACTIONS_LIST_FOR_RELEASE = new InjectionToken<
  (
    owner: string,
    repo: string,
    releaseId: string,
    params?:
      | ReactionsListForReleaseParams
      | (() => ReactionsListForReleaseParams | undefined),
  ) => ReturnType<typeof httpResource<ReactionsListForReleaseResponse>>
>('REACTIONS_LIST_FOR_RELEASE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      releaseId: string,
      params?:
        | ReactionsListForReleaseParams
        | (() => ReactionsListForReleaseParams | undefined),
    ) =>
      httpResource<ReactionsListForReleaseResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/releases/${releaseId}/reactions`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
