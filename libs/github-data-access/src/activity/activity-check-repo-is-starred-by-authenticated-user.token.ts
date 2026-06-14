import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ACTIVITY_CHECK_REPO_IS_STARRED_BY_AUTHENTICATED_USER =
  new InjectionToken<
    (owner: string, repo: string) => ReturnType<typeof httpResource<unknown>>
  >('ACTIVITY_CHECK_REPO_IS_STARRED_BY_AUTHENTICATED_USER');

export function provideActivityCheckRepoIsStarredByAuthenticatedUser(): FactoryProvider {
  return {
    provide: ACTIVITY_CHECK_REPO_IS_STARRED_BY_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/user/starred/${owner}/${repo}`,
        }));
    },
  };
}
