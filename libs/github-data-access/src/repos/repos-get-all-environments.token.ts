import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposGetAllEnvironmentsParams =
  paths['/repos/{owner}/{repo}/environments']['get']['parameters']['query'];

type ReposGetAllEnvironmentsResponse =
  paths['/repos/{owner}/{repo}/environments']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_ALL_ENVIRONMENTS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?: ReposGetAllEnvironmentsParams,
  ) => ReturnType<typeof httpResource<ReposGetAllEnvironmentsResponse>>
>('REPOS_GET_ALL_ENVIRONMENTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      params?: ReposGetAllEnvironmentsParams,
    ) =>
      httpResource<ReposGetAllEnvironmentsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/environments`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
