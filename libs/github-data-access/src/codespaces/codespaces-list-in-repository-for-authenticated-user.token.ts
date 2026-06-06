import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesListInRepositoryForAuthenticatedUserParams =
  paths['/repos/{owner}/{repo}/codespaces']['get']['parameters']['query'];

export type CodespacesListInRepositoryForAuthenticatedUserResponse =
  paths['/repos/{owner}/{repo}/codespaces']['get']['responses']['200']['content']['application/json'];

export const CODESPACES_LIST_IN_REPOSITORY_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      owner: string,
      repo: string,
      params?:
        | CodespacesListInRepositoryForAuthenticatedUserParams
        | (() =>
            | CodespacesListInRepositoryForAuthenticatedUserParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<CodespacesListInRepositoryForAuthenticatedUserResponse>
    >
  >('CODESPACES_LIST_IN_REPOSITORY_FOR_AUTHENTICATED_USER');

export function provideCodespacesListInRepositoryForAuthenticatedUser(): FactoryProvider {
  return {
    provide: CODESPACES_LIST_IN_REPOSITORY_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | CodespacesListInRepositoryForAuthenticatedUserParams
          | (() =>
              | CodespacesListInRepositoryForAuthenticatedUserParams
              | undefined),
      ) =>
        httpResource<CodespacesListInRepositoryForAuthenticatedUserResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/codespaces`,
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
