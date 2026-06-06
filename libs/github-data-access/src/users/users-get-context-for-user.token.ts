import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type UsersGetContextForUserParams =
  paths['/users/{username}/hovercard']['get']['parameters']['query'];

type UsersGetContextForUserResponse =
  paths['/users/{username}/hovercard']['get']['responses']['200']['content']['application/json'];

export const USERS_GET_CONTEXT_FOR_USER = new InjectionToken<
  (
    username: string,
    params?: UsersGetContextForUserParams,
  ) => ReturnType<typeof httpResource<UsersGetContextForUserResponse>>
>('USERS_GET_CONTEXT_FOR_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (username: string, params?: UsersGetContextForUserParams) =>
      httpResource<UsersGetContextForUserResponse>(() => ({
        url: `${base}/users/${username}/hovercard`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
