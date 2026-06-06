import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetAccessRestrictionsResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/restrictions']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_ACCESS_RESTRICTIONS = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
  ) => ReturnType<typeof httpResource<ReposGetAccessRestrictionsResponse>>
>('REPOS_GET_ACCESS_RESTRICTIONS');

export function provideReposGetAccessRestrictions(): FactoryProvider {
  return {
    provide: REPOS_GET_ACCESS_RESTRICTIONS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, branch: string) =>
        httpResource<ReposGetAccessRestrictionsResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/restrictions`,
        }));
    },
  };
}
