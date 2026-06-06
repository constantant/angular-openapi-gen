import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const REPOS_DISABLE_IMMUTABLE_RELEASES = new InjectionToken<
  (owner: string, repo: string) => ReturnType<typeof httpResource<unknown>>
>('REPOS_DISABLE_IMMUTABLE_RELEASES');

export function provideReposDisableImmutableReleases(): FactoryProvider {
  return {
    provide: REPOS_DISABLE_IMMUTABLE_RELEASES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/immutable-releases`,
          method: 'DELETE',
        }));
    },
  };
}
