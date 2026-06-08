import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCreateForkBody = NonNullable<
  paths['/repos/{owner}/{repo}/forks']['post']['requestBody']
>['content']['application/json'];

export type ReposCreateForkResponse =
  paths['/repos/{owner}/{repo}/forks']['post']['responses']['202']['content']['application/json'];

export const REPOS_CREATE_FORK = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: ReposCreateForkBody | Signal<ReposCreateForkBody>,
  ) => ReturnType<typeof httpResource<ReposCreateForkResponse>>
>('REPOS_CREATE_FORK');

export function provideReposCreateFork(): FactoryProvider {
  return {
    provide: REPOS_CREATE_FORK,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body: ReposCreateForkBody | Signal<ReposCreateForkBody>,
      ) =>
        httpResource<ReposCreateForkResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/forks`,
          method: 'POST',
          body,
        }));
    },
  };
}
