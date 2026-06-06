import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposGetWebhookResponse =
  paths['/repos/{owner}/{repo}/hooks/{hook_id}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_WEBHOOK = new InjectionToken<
  (
    owner: string,
    repo: string,
    hook_id: string,
  ) => ReturnType<typeof httpResource<ReposGetWebhookResponse>>
>('REPOS_GET_WEBHOOK', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, hook_id: string) =>
      httpResource<ReposGetWebhookResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/hooks/${hook_id}`,
      }));
  },
});
