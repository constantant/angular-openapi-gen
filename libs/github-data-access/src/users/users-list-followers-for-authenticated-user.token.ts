import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type UsersListFollowersForAuthenticatedUserParams =
  paths['/user/followers']['get']['parameters']['query'];

type UsersListFollowersForAuthenticatedUserResponse =
  paths['/user/followers']['get']['responses']['200']['content']['application/json'];

export const USERS_LIST_FOLLOWERS_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    params?: UsersListFollowersForAuthenticatedUserParams,
  ) => ReturnType<
    typeof httpResource<UsersListFollowersForAuthenticatedUserResponse>
  >
>('USERS_LIST_FOLLOWERS_FOR_AUTHENTICATED_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (params?: UsersListFollowersForAuthenticatedUserParams) =>
      httpResource<UsersListFollowersForAuthenticatedUserResponse>(() => ({
        url: `${base}/user/followers`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
