import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesListDevcontainersInRepositoryForAuthenticatedUserParams =
  paths['/repos/{owner}/{repo}/codespaces/devcontainers']['get']['parameters']['query'];

export type CodespacesListDevcontainersInRepositoryForAuthenticatedUserResponse =
  paths['/repos/{owner}/{repo}/codespaces/devcontainers']['get']['responses']['200']['content']['application/json'];

export const CODESPACES_LIST_DEVCONTAINERS_IN_REPOSITORY_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      owner: string,
      repo: string,
      params?:
        | CodespacesListDevcontainersInRepositoryForAuthenticatedUserParams
        | (() =>
            | CodespacesListDevcontainersInRepositoryForAuthenticatedUserParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<CodespacesListDevcontainersInRepositoryForAuthenticatedUserResponse>
    >
  >('CODESPACES_LIST_DEVCONTAINERS_IN_REPOSITORY_FOR_AUTHENTICATED_USER');

export function provideCodespacesListDevcontainersInRepositoryForAuthenticatedUser(): FactoryProvider {
  return {
    provide: CODESPACES_LIST_DEVCONTAINERS_IN_REPOSITORY_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | CodespacesListDevcontainersInRepositoryForAuthenticatedUserParams
          | (() =>
              | CodespacesListDevcontainersInRepositoryForAuthenticatedUserParams
              | undefined),
      ) =>
        httpResource<CodespacesListDevcontainersInRepositoryForAuthenticatedUserResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/codespaces/devcontainers`,
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
