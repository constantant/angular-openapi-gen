import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ACTIONS_DELETE_SELF_HOSTED_RUNNER_FROM_REPO = new InjectionToken<
  (
    owner: string,
    repo: string,
    runnerId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ACTIONS_DELETE_SELF_HOSTED_RUNNER_FROM_REPO', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, runnerId: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/repos/${owner}/${repo}/actions/runners/${runnerId}`,
        method: 'DELETE',
      }));
  },
});
