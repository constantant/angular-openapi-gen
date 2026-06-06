import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const PULLS_CHECK_IF_MERGED = new InjectionToken<
  (
    owner: string,
    repo: string,
    pullNumber: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('PULLS_CHECK_IF_MERGED', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, pullNumber: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/repos/${owner}/${repo}/pulls/${pullNumber}/merge`,
      }));
  },
});
