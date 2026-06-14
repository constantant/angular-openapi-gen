import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type GitCreateTreeBody = NonNullable<
  paths['/repos/{owner}/{repo}/git/trees']['post']['requestBody']
>['content']['application/json'];

export type GitCreateTreeResponse =
  paths['/repos/{owner}/{repo}/git/trees']['post']['responses']['201']['content']['application/json'];

export const GIT_CREATE_TREE = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: GitCreateTreeBody | Signal<GitCreateTreeBody>,
  ) => ReturnType<typeof httpResource<GitCreateTreeResponse>>
>('GIT_CREATE_TREE');

export function provideGitCreateTree(): FactoryProvider {
  return {
    provide: GIT_CREATE_TREE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body: GitCreateTreeBody | Signal<GitCreateTreeBody>,
      ) =>
        httpResource<GitCreateTreeResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/git/trees`,
          method: 'POST',
          body,
        }));
    },
  };
}
