import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCreateReleaseBody = NonNullable<
  paths['/repos/{owner}/{repo}/releases']['post']['requestBody']
>['content']['application/json'];

export type ReposCreateReleaseResponse =
  paths['/repos/{owner}/{repo}/releases']['post']['responses']['201']['content']['application/json'];

export const REPOS_CREATE_RELEASE = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: ReposCreateReleaseBody | Signal<ReposCreateReleaseBody>,
  ) => ReturnType<typeof httpResource<ReposCreateReleaseResponse>>
>('REPOS_CREATE_RELEASE');

export function provideReposCreateRelease(): FactoryProvider {
  return {
    provide: REPOS_CREATE_RELEASE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body: ReposCreateReleaseBody | Signal<ReposCreateReleaseBody>,
      ) =>
        httpResource<ReposCreateReleaseResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/releases`,
          method: 'POST',
          body,
        }));
    },
  };
}
