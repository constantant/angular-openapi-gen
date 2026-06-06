import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposGetCommunityProfileMetricsResponse =
  paths['/repos/{owner}/{repo}/community/profile']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_COMMUNITY_PROFILE_METRICS = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ReposGetCommunityProfileMetricsResponse>>
>('REPOS_GET_COMMUNITY_PROFILE_METRICS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string) =>
      httpResource<ReposGetCommunityProfileMetricsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/community/profile`,
      }));
  },
});
