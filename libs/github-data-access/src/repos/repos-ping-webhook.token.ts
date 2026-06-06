import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const REPOS_PING_WEBHOOK = new InjectionToken<
  (
    owner: string,
    repo: string,
    hook_id: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('REPOS_PING_WEBHOOK', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, hook_id: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/repos/${owner}/${repo}/hooks/${hook_id}/pings`,
        method: 'POST',
      }));
  },
});
