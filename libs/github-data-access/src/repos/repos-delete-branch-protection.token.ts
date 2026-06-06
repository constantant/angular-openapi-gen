import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const REPOS_DELETE_BRANCH_PROTECTION = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('REPOS_DELETE_BRANCH_PROTECTION');

export function provideReposDeleteBranchProtection(): FactoryProvider {
  return {
    provide: REPOS_DELETE_BRANCH_PROTECTION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, branch: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection`,
          method: 'DELETE',
        }));
    },
  };
}
