import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesPreFlightWithRepoForAuthenticatedUserParams =
  paths['/repos/{owner}/{repo}/codespaces/new']['get']['parameters']['query'];

export type CodespacesPreFlightWithRepoForAuthenticatedUserResponse =
  paths['/repos/{owner}/{repo}/codespaces/new']['get']['responses']['200']['content']['application/json'];

export const CODESPACES_PRE_FLIGHT_WITH_REPO_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      owner: string,
      repo: string,
      params?:
        | CodespacesPreFlightWithRepoForAuthenticatedUserParams
        | (() =>
            | CodespacesPreFlightWithRepoForAuthenticatedUserParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<CodespacesPreFlightWithRepoForAuthenticatedUserResponse>
    >
  >('CODESPACES_PRE_FLIGHT_WITH_REPO_FOR_AUTHENTICATED_USER');

export function provideCodespacesPreFlightWithRepoForAuthenticatedUser(): FactoryProvider {
  return {
    provide: CODESPACES_PRE_FLIGHT_WITH_REPO_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | CodespacesPreFlightWithRepoForAuthenticatedUserParams
          | (() =>
              | CodespacesPreFlightWithRepoForAuthenticatedUserParams
              | undefined),
      ) =>
        httpResource<CodespacesPreFlightWithRepoForAuthenticatedUserResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/repos/${owner}/${repo}/codespaces/new`,
              params: _params as unknown as Record<
                string,
                | string
                | number
                | boolean
                | readonly (string | number | boolean)[]
              >,
            };
          },
        );
    },
  };
}
