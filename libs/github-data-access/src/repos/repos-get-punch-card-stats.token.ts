import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposGetPunchCardStatsResponse =
  paths['/repos/{owner}/{repo}/stats/punch_card']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_PUNCH_CARD_STATS = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ReposGetPunchCardStatsResponse>>
>('REPOS_GET_PUNCH_CARD_STATS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string) =>
      httpResource<ReposGetPunchCardStatsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/stats/punch_card`,
      }));
  },
});
