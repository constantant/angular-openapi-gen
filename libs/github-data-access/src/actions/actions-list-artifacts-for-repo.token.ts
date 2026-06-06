import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsListArtifactsForRepoParams =
  paths['/repos/{owner}/{repo}/actions/artifacts']['get']['parameters']['query'];

export type ActionsListArtifactsForRepoResponse =
  paths['/repos/{owner}/{repo}/actions/artifacts']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_LIST_ARTIFACTS_FOR_REPO = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | ActionsListArtifactsForRepoParams
      | (() => ActionsListArtifactsForRepoParams | undefined),
  ) => ReturnType<typeof httpResource<ActionsListArtifactsForRepoResponse>>
>('ACTIONS_LIST_ARTIFACTS_FOR_REPO', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      params?:
        | ActionsListArtifactsForRepoParams
        | (() => ActionsListArtifactsForRepoParams | undefined),
    ) =>
      httpResource<ActionsListArtifactsForRepoResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/actions/artifacts`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
