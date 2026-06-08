import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesListForAuthenticatedUserParams =
  paths['/user/issues']['get']['parameters']['query'];

export type IssuesListForAuthenticatedUserResponse =
  paths['/user/issues']['get']['responses']['200']['content']['application/json'];

export const ISSUES_LIST_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    params?:
      | IssuesListForAuthenticatedUserParams
      | (() => IssuesListForAuthenticatedUserParams | undefined),
  ) => ReturnType<typeof httpResource<IssuesListForAuthenticatedUserResponse>>
>('ISSUES_LIST_FOR_AUTHENTICATED_USER');

export function provideIssuesListForAuthenticatedUser(): FactoryProvider {
  return {
    provide: ISSUES_LIST_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | IssuesListForAuthenticatedUserParams
          | (() => IssuesListForAuthenticatedUserParams | undefined),
      ) =>
        httpResource<IssuesListForAuthenticatedUserResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/user/issues`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
