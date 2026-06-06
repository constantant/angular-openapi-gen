import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposGetWebhookConfigForRepoResponse =
  paths['/repos/{owner}/{repo}/hooks/{hook_id}/config']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_WEBHOOK_CONFIG_FOR_REPO = new InjectionToken<
  (
    owner: string,
    repo: string,
    hook_id: string,
  ) => ReturnType<typeof httpResource<ReposGetWebhookConfigForRepoResponse>>
>('REPOS_GET_WEBHOOK_CONFIG_FOR_REPO', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, hook_id: string) =>
      httpResource<ReposGetWebhookConfigForRepoResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/hooks/${hook_id}/config`,
      }));
  },
});
