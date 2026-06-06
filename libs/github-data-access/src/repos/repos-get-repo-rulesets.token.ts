import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetRepoRulesetsParams =
  paths['/repos/{owner}/{repo}/rulesets']['get']['parameters']['query'];

export type ReposGetRepoRulesetsResponse =
  paths['/repos/{owner}/{repo}/rulesets']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_REPO_RULESETS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | ReposGetRepoRulesetsParams
      | (() => ReposGetRepoRulesetsParams | undefined),
  ) => ReturnType<typeof httpResource<ReposGetRepoRulesetsResponse>>
>('REPOS_GET_REPO_RULESETS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      params?:
        | ReposGetRepoRulesetsParams
        | (() => ReposGetRepoRulesetsParams | undefined),
    ) =>
      httpResource<ReposGetRepoRulesetsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/rulesets`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
