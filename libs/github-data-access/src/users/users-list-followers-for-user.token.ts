import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type UsersListFollowersForUserParams =
  paths['/users/{username}/followers']['get']['parameters']['query'];

type UsersListFollowersForUserResponse =
  paths['/users/{username}/followers']['get']['responses']['200']['content']['application/json'];

export const USERS_LIST_FOLLOWERS_FOR_USER = new InjectionToken<
  (
    username: string,
    params?: UsersListFollowersForUserParams,
  ) => ReturnType<typeof httpResource<UsersListFollowersForUserResponse>>
>('USERS_LIST_FOLLOWERS_FOR_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (username: string, params?: UsersListFollowersForUserParams) =>
      httpResource<UsersListFollowersForUserResponse>(() => ({
        url: `${base}/users/${username}/followers`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
