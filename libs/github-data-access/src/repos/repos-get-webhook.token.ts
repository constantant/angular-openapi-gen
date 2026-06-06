import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetWebhookResponse =
  paths['/repos/{owner}/{repo}/hooks/{hook_id}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_WEBHOOK = new InjectionToken<
  (
    owner: string,
    repo: string,
    hookId: string,
  ) => ReturnType<typeof httpResource<ReposGetWebhookResponse>>
>('REPOS_GET_WEBHOOK');

export function provideReposGetWebhook(): FactoryProvider {
  return {
    provide: REPOS_GET_WEBHOOK,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, hookId: string) =>
        httpResource<ReposGetWebhookResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/hooks/${hookId}`,
        }));
    },
  };
}
