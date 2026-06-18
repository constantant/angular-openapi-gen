import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposEnableImmutableReleasesError =
  paths['/repos/{owner}/{repo}/immutable-releases']['put']['responses']['409']['content']['application/json'];

export const REPOS_ENABLE_IMMUTABLE_RELEASES = new InjectionToken<
  (owner: string, repo: string) => ReturnType<typeof httpResource<unknown>>
>('REPOS_ENABLE_IMMUTABLE_RELEASES');

export function provideReposEnableImmutableReleases(): FactoryProvider {
  return {
    provide: REPOS_ENABLE_IMMUTABLE_RELEASES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/immutable-releases`,
          method: 'PUT',
        }));
    },
  };
}
