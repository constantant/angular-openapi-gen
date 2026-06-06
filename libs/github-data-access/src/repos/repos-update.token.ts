import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposUpdateBody = NonNullable<
  paths['/repos/{owner}/{repo}']['patch']['requestBody']
>['content']['application/json'];

export type ReposUpdateResponse =
  paths['/repos/{owner}/{repo}']['patch']['responses']['200']['content']['application/json'];

export const REPOS_UPDATE = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: ReposUpdateBody | Signal<ReposUpdateBody>,
  ) => ReturnType<typeof httpResource<ReposUpdateResponse>>
>('REPOS_UPDATE');

export function provideReposUpdate(): FactoryProvider {
  return {
    provide: REPOS_UPDATE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body: ReposUpdateBody | Signal<ReposUpdateBody>,
      ) =>
        httpResource<ReposUpdateResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}`,
          method: 'PATCH',
          body,
        }));
    },
  };
}
