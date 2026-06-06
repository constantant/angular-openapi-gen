import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type TeamsListForAuthenticatedUserParams =
  paths['/user/teams']['get']['parameters']['query'];

export type TeamsListForAuthenticatedUserResponse =
  paths['/user/teams']['get']['responses']['200']['content']['application/json'];

export const TEAMS_LIST_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    params?:
      | TeamsListForAuthenticatedUserParams
      | (() => TeamsListForAuthenticatedUserParams | undefined),
  ) => ReturnType<typeof httpResource<TeamsListForAuthenticatedUserResponse>>
>('TEAMS_LIST_FOR_AUTHENTICATED_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      params?:
        | TeamsListForAuthenticatedUserParams
        | (() => TeamsListForAuthenticatedUserParams | undefined),
    ) =>
      httpResource<TeamsListForAuthenticatedUserResponse>(() => ({
        url: `${base}/user/teams`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
