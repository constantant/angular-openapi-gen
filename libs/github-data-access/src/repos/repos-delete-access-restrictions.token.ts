import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const REPOS_DELETE_ACCESS_RESTRICTIONS = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('REPOS_DELETE_ACCESS_RESTRICTIONS');

export function provideReposDeleteAccessRestrictions(): FactoryProvider {
  return {
    provide: REPOS_DELETE_ACCESS_RESTRICTIONS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, branch: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/restrictions`,
          method: 'DELETE',
        }));
    },
  };
}
