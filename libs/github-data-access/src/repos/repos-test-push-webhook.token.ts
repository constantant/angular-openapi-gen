import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const REPOS_TEST_PUSH_WEBHOOK = new InjectionToken<
  (
    owner: string,
    repo: string,
    hookId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('REPOS_TEST_PUSH_WEBHOOK', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, hookId: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/repos/${owner}/${repo}/hooks/${hookId}/tests`,
        method: 'POST',
      }));
  },
});
