import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposUpdateWebhookBody = NonNullable<
  paths['/repos/{owner}/{repo}/hooks/{hook_id}']['patch']['requestBody']
>['content']['application/json'];

type ReposUpdateWebhookResponse =
  paths['/repos/{owner}/{repo}/hooks/{hook_id}']['patch']['responses']['200']['content']['application/json'];

export const REPOS_UPDATE_WEBHOOK = new InjectionToken<
  (
    owner: string,
    repo: string,
    hook_id: string,
    body: ReposUpdateWebhookBody | Signal<ReposUpdateWebhookBody>,
  ) => ReturnType<typeof httpResource<ReposUpdateWebhookResponse>>
>('REPOS_UPDATE_WEBHOOK', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      hook_id: string,
      body: ReposUpdateWebhookBody | Signal<ReposUpdateWebhookBody>,
    ) =>
      httpResource<ReposUpdateWebhookResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/hooks/${hook_id}`,
        method: 'PATCH',
        body,
      }));
  },
});
