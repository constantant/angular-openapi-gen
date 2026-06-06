import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposRequestPagesBuildResponse =
  paths['/repos/{owner}/{repo}/pages/builds']['post']['responses']['201']['content']['application/json'];

export const REPOS_REQUEST_PAGES_BUILD = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ReposRequestPagesBuildResponse>>
>('REPOS_REQUEST_PAGES_BUILD');

export function provideReposRequestPagesBuild(): FactoryProvider {
  return {
    provide: REPOS_REQUEST_PAGES_BUILD,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<ReposRequestPagesBuildResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/pages/builds`,
          method: 'POST',
        }));
    },
  };
}
