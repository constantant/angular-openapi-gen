import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PullsGetResponse =
  paths['/repos/{owner}/{repo}/pulls/{pull_number}']['get']['responses']['200']['content']['application/json'];

export const PULLS_GET = new InjectionToken<
  (
    owner: string,
    repo: string,
    pullNumber: string,
  ) => ReturnType<typeof httpResource<PullsGetResponse>>
>('PULLS_GET', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, pullNumber: string) =>
      httpResource<PullsGetResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/pulls/${pullNumber}`,
      }));
  },
});
