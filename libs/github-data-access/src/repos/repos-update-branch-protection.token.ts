import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposUpdateBranchProtectionBody = NonNullable<
  paths['/repos/{owner}/{repo}/branches/{branch}/protection']['put']['requestBody']
>['content']['application/json'];

export type ReposUpdateBranchProtectionResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection']['put']['responses']['200']['content']['application/json'];

export const REPOS_UPDATE_BRANCH_PROTECTION = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
    body:
      | ReposUpdateBranchProtectionBody
      | Signal<ReposUpdateBranchProtectionBody>,
  ) => ReturnType<typeof httpResource<ReposUpdateBranchProtectionResponse>>
>('REPOS_UPDATE_BRANCH_PROTECTION');

export function provideReposUpdateBranchProtection(): FactoryProvider {
  return {
    provide: REPOS_UPDATE_BRANCH_PROTECTION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        branch: string,
        body:
          | ReposUpdateBranchProtectionBody
          | Signal<ReposUpdateBranchProtectionBody>,
      ) =>
        httpResource<ReposUpdateBranchProtectionResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection`,
          method: 'PUT',
          body,
        }));
    },
  };
}
