import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetWebhookConfigForRepoResponse =
  paths['/repos/{owner}/{repo}/hooks/{hook_id}/config']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_WEBHOOK_CONFIG_FOR_REPO = new InjectionToken<
  (
    owner: string,
    repo: string,
    hookId: string,
  ) => ReturnType<typeof httpResource<ReposGetWebhookConfigForRepoResponse>>
>('REPOS_GET_WEBHOOK_CONFIG_FOR_REPO');

export function provideReposGetWebhookConfigForRepo(): FactoryProvider {
  return {
    provide: REPOS_GET_WEBHOOK_CONFIG_FOR_REPO,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, hookId: string) =>
        httpResource<ReposGetWebhookConfigForRepoResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/hooks/${hookId}/config`,
        }));
    },
  };
}
