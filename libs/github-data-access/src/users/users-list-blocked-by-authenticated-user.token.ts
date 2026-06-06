import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type UsersListBlockedByAuthenticatedUserParams =
  paths['/user/blocks']['get']['parameters']['query'];

type UsersListBlockedByAuthenticatedUserResponse =
  paths['/user/blocks']['get']['responses']['200']['content']['application/json'];

export const USERS_LIST_BLOCKED_BY_AUTHENTICATED_USER = new InjectionToken<
  (
    params?: UsersListBlockedByAuthenticatedUserParams,
  ) => ReturnType<
    typeof httpResource<UsersListBlockedByAuthenticatedUserResponse>
  >
>('USERS_LIST_BLOCKED_BY_AUTHENTICATED_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (params?: UsersListBlockedByAuthenticatedUserParams) =>
      httpResource<UsersListBlockedByAuthenticatedUserResponse>(() => ({
        url: `${base}/user/blocks`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
