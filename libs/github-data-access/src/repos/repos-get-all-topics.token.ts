import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposGetAllTopicsParams =
  paths['/repos/{owner}/{repo}/topics']['get']['parameters']['query'];

type ReposGetAllTopicsResponse =
  paths['/repos/{owner}/{repo}/topics']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_ALL_TOPICS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?: ReposGetAllTopicsParams,
  ) => ReturnType<typeof httpResource<ReposGetAllTopicsResponse>>
>('REPOS_GET_ALL_TOPICS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, params?: ReposGetAllTopicsParams) =>
      httpResource<ReposGetAllTopicsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/topics`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
