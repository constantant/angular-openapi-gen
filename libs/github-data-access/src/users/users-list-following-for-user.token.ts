import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type UsersListFollowingForUserParams =
  paths['/users/{username}/following']['get']['parameters']['query'];

type UsersListFollowingForUserResponse =
  paths['/users/{username}/following']['get']['responses']['200']['content']['application/json'];

export const USERS_LIST_FOLLOWING_FOR_USER = new InjectionToken<
  (
    username: string,
    params?: UsersListFollowingForUserParams,
  ) => ReturnType<typeof httpResource<UsersListFollowingForUserResponse>>
>('USERS_LIST_FOLLOWING_FOR_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (username: string, params?: UsersListFollowingForUserParams) =>
      httpResource<UsersListFollowingForUserResponse>(() => ({
        url: `${base}/users/${username}/following`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
