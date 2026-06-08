import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListForUserParams =
  paths['/users/{username}/repos']['get']['parameters']['query'];

export type ReposListForUserResponse =
  paths['/users/{username}/repos']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_FOR_USER = new InjectionToken<
  (
    username: string,
    params?:
      | ReposListForUserParams
      | (() => ReposListForUserParams | undefined),
  ) => ReturnType<typeof httpResource<ReposListForUserResponse>>
>('REPOS_LIST_FOR_USER');

export function provideReposListForUser(): FactoryProvider {
  return {
    provide: REPOS_LIST_FOR_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        username: string,
        params?:
          | ReposListForUserParams
          | (() => ReposListForUserParams | undefined),
      ) =>
        httpResource<ReposListForUserResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/users/${username}/repos`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
