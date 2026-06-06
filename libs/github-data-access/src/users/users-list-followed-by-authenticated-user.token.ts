import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type UsersListFollowedByAuthenticatedUserParams =
  paths['/user/following']['get']['parameters']['query'];

type UsersListFollowedByAuthenticatedUserResponse =
  paths['/user/following']['get']['responses']['200']['content']['application/json'];

export const USERS_LIST_FOLLOWED_BY_AUTHENTICATED_USER = new InjectionToken<
  (
    params?: UsersListFollowedByAuthenticatedUserParams,
  ) => ReturnType<
    typeof httpResource<UsersListFollowedByAuthenticatedUserResponse>
  >
>('USERS_LIST_FOLLOWED_BY_AUTHENTICATED_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (params?: UsersListFollowedByAuthenticatedUserParams) =>
      httpResource<UsersListFollowedByAuthenticatedUserResponse>(() => ({
        url: `${base}/user/following`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
