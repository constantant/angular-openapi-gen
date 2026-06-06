import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposListTeamsParams =
  paths['/repos/{owner}/{repo}/teams']['get']['parameters']['query'];

type ReposListTeamsResponse =
  paths['/repos/{owner}/{repo}/teams']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_TEAMS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?: ReposListTeamsParams,
  ) => ReturnType<typeof httpResource<ReposListTeamsResponse>>
>('REPOS_LIST_TEAMS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, params?: ReposListTeamsParams) =>
      httpResource<ReposListTeamsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/teams`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
