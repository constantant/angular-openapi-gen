import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListForAuthenticatedUserParams =
  paths['/user/repos']['get']['parameters']['query'];

export type ReposListForAuthenticatedUserResponse =
  paths['/user/repos']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    params?:
      | ReposListForAuthenticatedUserParams
      | (() => ReposListForAuthenticatedUserParams | undefined),
  ) => ReturnType<typeof httpResource<ReposListForAuthenticatedUserResponse>>
>('REPOS_LIST_FOR_AUTHENTICATED_USER');

export function provideReposListForAuthenticatedUser(): FactoryProvider {
  return {
    provide: REPOS_LIST_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | ReposListForAuthenticatedUserParams
          | (() => ReposListForAuthenticatedUserParams | undefined),
      ) =>
        httpResource<ReposListForAuthenticatedUserResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/user/repos`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
