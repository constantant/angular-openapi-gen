import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const REPOS_REMOVE_STATUS_CHECK_PROTECTION = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('REPOS_REMOVE_STATUS_CHECK_PROTECTION');

export function provideReposRemoveStatusCheckProtection(): FactoryProvider {
  return {
    provide: REPOS_REMOVE_STATUS_CHECK_PROTECTION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, branch: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/required_status_checks`,
          method: 'DELETE',
        }));
    },
  };
}
