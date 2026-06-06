import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposCreateWebhookBody = NonNullable<
  paths['/repos/{owner}/{repo}/hooks']['post']['requestBody']
>['content']['application/json'];

type ReposCreateWebhookResponse =
  paths['/repos/{owner}/{repo}/hooks']['post']['responses']['201']['content']['application/json'];

export const REPOS_CREATE_WEBHOOK = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: ReposCreateWebhookBody | Signal<ReposCreateWebhookBody>,
  ) => ReturnType<typeof httpResource<ReposCreateWebhookResponse>>
>('REPOS_CREATE_WEBHOOK', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      body: ReposCreateWebhookBody | Signal<ReposCreateWebhookBody>,
    ) =>
      httpResource<ReposCreateWebhookResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/hooks`,
        method: 'POST',
        body,
      }));
  },
});
