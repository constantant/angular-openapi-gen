import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposUpdateWebhookConfigForRepoBody = NonNullable<
  paths['/repos/{owner}/{repo}/hooks/{hook_id}/config']['patch']['requestBody']
>['content']['application/json'];

type ReposUpdateWebhookConfigForRepoResponse =
  paths['/repos/{owner}/{repo}/hooks/{hook_id}/config']['patch']['responses']['200']['content']['application/json'];

export const REPOS_UPDATE_WEBHOOK_CONFIG_FOR_REPO = new InjectionToken<
  (
    owner: string,
    repo: string,
    hook_id: string,
    body:
      | ReposUpdateWebhookConfigForRepoBody
      | Signal<ReposUpdateWebhookConfigForRepoBody>,
  ) => ReturnType<typeof httpResource<ReposUpdateWebhookConfigForRepoResponse>>
>('REPOS_UPDATE_WEBHOOK_CONFIG_FOR_REPO', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      hook_id: string,
      body:
        | ReposUpdateWebhookConfigForRepoBody
        | Signal<ReposUpdateWebhookConfigForRepoBody>,
    ) =>
      httpResource<ReposUpdateWebhookConfigForRepoResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/hooks/${hook_id}/config`,
        method: 'PATCH',
        body,
      }));
  },
});
