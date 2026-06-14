import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const DEPENDABOT_DELETE_REPO_SECRET = new InjectionToken<
  (
    owner: string,
    repo: string,
    secretName: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('DEPENDABOT_DELETE_REPO_SECRET');

export function provideDependabotDeleteRepoSecret(): FactoryProvider {
  return {
    provide: DEPENDABOT_DELETE_REPO_SECRET,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, secretName: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/dependabot/secrets/${secretName}`,
          method: 'DELETE',
        }));
    },
  };
}
