import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const REPOS_DELETE_AN_ENVIRONMENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    environmentName: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('REPOS_DELETE_AN_ENVIRONMENT');

export function provideReposDeleteAnEnvironment(): FactoryProvider {
  return {
    provide: REPOS_DELETE_AN_ENVIRONMENT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, environmentName: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/environments/${environmentName}`,
          method: 'DELETE',
        }));
    },
  };
}
