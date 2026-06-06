import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const REPOS_DELETE_AUTOLINK = new InjectionToken<
  (
    owner: string,
    repo: string,
    autolinkId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('REPOS_DELETE_AUTOLINK');

export function provideReposDeleteAutolink(): FactoryProvider {
  return {
    provide: REPOS_DELETE_AUTOLINK,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, autolinkId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/autolinks/${autolinkId}`,
          method: 'DELETE',
        }));
    },
  };
}
