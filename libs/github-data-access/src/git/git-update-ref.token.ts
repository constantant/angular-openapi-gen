import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type GitUpdateRefBody = NonNullable<
  paths['/repos/{owner}/{repo}/git/refs/{ref}']['patch']['requestBody']
>['content']['application/json'];

export type GitUpdateRefResponse =
  paths['/repos/{owner}/{repo}/git/refs/{ref}']['patch']['responses']['200']['content']['application/json'];

export const GIT_UPDATE_REF = new InjectionToken<
  (
    owner: string,
    repo: string,
    ref: string,
    body: GitUpdateRefBody | Signal<GitUpdateRefBody>,
  ) => ReturnType<typeof httpResource<GitUpdateRefResponse>>
>('GIT_UPDATE_REF');

export function provideGitUpdateRef(): FactoryProvider {
  return {
    provide: GIT_UPDATE_REF,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        ref: string,
        body: GitUpdateRefBody | Signal<GitUpdateRefBody>,
      ) =>
        httpResource<GitUpdateRefResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/git/refs/${ref}`,
          method: 'PATCH',
          body,
        }));
    },
  };
}
