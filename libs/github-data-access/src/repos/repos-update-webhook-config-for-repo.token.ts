import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposUpdateWebhookConfigForRepoBody = NonNullable<
  paths['/repos/{owner}/{repo}/hooks/{hook_id}/config']['patch']['requestBody']
>['content']['application/json'];

export type ReposUpdateWebhookConfigForRepoResponse =
  paths['/repos/{owner}/{repo}/hooks/{hook_id}/config']['patch']['responses']['200']['content']['application/json'];

export const REPOS_UPDATE_WEBHOOK_CONFIG_FOR_REPO = new InjectionToken<
  (
    owner: string,
    repo: string,
    hookId: string,
    body:
      | ReposUpdateWebhookConfigForRepoBody
      | Signal<ReposUpdateWebhookConfigForRepoBody>,
  ) => ReturnType<typeof httpResource<ReposUpdateWebhookConfigForRepoResponse>>
>('REPOS_UPDATE_WEBHOOK_CONFIG_FOR_REPO');

export function provideReposUpdateWebhookConfigForRepo(): FactoryProvider {
  return {
    provide: REPOS_UPDATE_WEBHOOK_CONFIG_FOR_REPO,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        hookId: string,
        body:
          | ReposUpdateWebhookConfigForRepoBody
          | Signal<ReposUpdateWebhookConfigForRepoBody>,
      ) =>
        httpResource<ReposUpdateWebhookConfigForRepoResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/hooks/${hookId}/config`,
          method: 'PATCH',
          body,
        }));
    },
  };
}
