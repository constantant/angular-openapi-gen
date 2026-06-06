import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesRepoMachinesForAuthenticatedUserParams =
  paths['/repos/{owner}/{repo}/codespaces/machines']['get']['parameters']['query'];

export type CodespacesRepoMachinesForAuthenticatedUserResponse =
  paths['/repos/{owner}/{repo}/codespaces/machines']['get']['responses']['200']['content']['application/json'];

export const CODESPACES_REPO_MACHINES_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      owner: string,
      repo: string,
      params?:
        | CodespacesRepoMachinesForAuthenticatedUserParams
        | (() => CodespacesRepoMachinesForAuthenticatedUserParams | undefined),
    ) => ReturnType<
      typeof httpResource<CodespacesRepoMachinesForAuthenticatedUserResponse>
    >
  >('CODESPACES_REPO_MACHINES_FOR_AUTHENTICATED_USER');

export function provideCodespacesRepoMachinesForAuthenticatedUser(): FactoryProvider {
  return {
    provide: CODESPACES_REPO_MACHINES_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | CodespacesRepoMachinesForAuthenticatedUserParams
          | (() =>
              | CodespacesRepoMachinesForAuthenticatedUserParams
              | undefined),
      ) =>
        httpResource<CodespacesRepoMachinesForAuthenticatedUserResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/codespaces/machines`,
            params: (typeof params === 'function'
              ? params()
              : params) as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  };
}
