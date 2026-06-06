import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposListActivitiesParams =
  paths['/repos/{owner}/{repo}/activity']['get']['parameters']['query'];

type ReposListActivitiesResponse =
  paths['/repos/{owner}/{repo}/activity']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_ACTIVITIES = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?: ReposListActivitiesParams,
  ) => ReturnType<typeof httpResource<ReposListActivitiesResponse>>
>('REPOS_LIST_ACTIVITIES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, params?: ReposListActivitiesParams) =>
      httpResource<ReposListActivitiesResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/activity`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
