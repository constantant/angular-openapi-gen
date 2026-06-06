import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetResponse =
  paths['/repos/{owner}/{repo}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ReposGetResponse>>
>('REPOS_GET');

export function provideReposGet(): FactoryProvider {
  return {
    provide: REPOS_GET,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<ReposGetResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}`,
        }));
    },
  };
}
