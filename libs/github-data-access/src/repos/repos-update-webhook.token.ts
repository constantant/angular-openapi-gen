import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposUpdateWebhookBody = NonNullable<
  paths['/repos/{owner}/{repo}/hooks/{hook_id}']['patch']['requestBody']
>['content']['application/json'];

export type ReposUpdateWebhookResponse =
  paths['/repos/{owner}/{repo}/hooks/{hook_id}']['patch']['responses']['200']['content']['application/json'];

export const REPOS_UPDATE_WEBHOOK = new InjectionToken<
  (
    owner: string,
    repo: string,
    hookId: string,
    body: ReposUpdateWebhookBody | Signal<ReposUpdateWebhookBody>,
  ) => ReturnType<typeof httpResource<ReposUpdateWebhookResponse>>
>('REPOS_UPDATE_WEBHOOK');

export function provideReposUpdateWebhook(): FactoryProvider {
  return {
    provide: REPOS_UPDATE_WEBHOOK,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        hookId: string,
        body: ReposUpdateWebhookBody | Signal<ReposUpdateWebhookBody>,
      ) =>
        httpResource<ReposUpdateWebhookResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/hooks/${hookId}`,
          method: 'PATCH',
          body,
        }));
    },
  };
}
