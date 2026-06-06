import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetPagesHealthCheckResponse =
  paths['/repos/{owner}/{repo}/pages/health']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_PAGES_HEALTH_CHECK = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ReposGetPagesHealthCheckResponse>>
>('REPOS_GET_PAGES_HEALTH_CHECK');

export function provideReposGetPagesHealthCheck(): FactoryProvider {
  return {
    provide: REPOS_GET_PAGES_HEALTH_CHECK,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<ReposGetPagesHealthCheckResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/pages/health`,
        }));
    },
  };
}
