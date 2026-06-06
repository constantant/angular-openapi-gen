import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposGetTopReferrersResponse =
  paths['/repos/{owner}/{repo}/traffic/popular/referrers']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_TOP_REFERRERS = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ReposGetTopReferrersResponse>>
>('REPOS_GET_TOP_REFERRERS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string) =>
      httpResource<ReposGetTopReferrersResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/traffic/popular/referrers`,
      }));
  },
});
