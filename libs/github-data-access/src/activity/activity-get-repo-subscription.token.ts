import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActivityGetRepoSubscriptionResponse =
  paths['/repos/{owner}/{repo}/subscription']['get']['responses']['200']['content']['application/json'];

export const ACTIVITY_GET_REPO_SUBSCRIPTION = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ActivityGetRepoSubscriptionResponse>>
>('ACTIVITY_GET_REPO_SUBSCRIPTION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string) =>
      httpResource<ActivityGetRepoSubscriptionResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/subscription`,
      }));
  },
});
