import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const REPOS_PING_WEBHOOK = new InjectionToken<
  (
    owner: string,
    repo: string,
    hookId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('REPOS_PING_WEBHOOK');

export function provideReposPingWebhook(): FactoryProvider {
  return {
    provide: REPOS_PING_WEBHOOK,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, hookId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/hooks/${hookId}/pings`,
          method: 'POST',
        }));
    },
  };
}
