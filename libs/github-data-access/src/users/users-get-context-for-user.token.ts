import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersGetContextForUserParams =
  paths['/users/{username}/hovercard']['get']['parameters']['query'];

export type UsersGetContextForUserResponse =
  paths['/users/{username}/hovercard']['get']['responses']['200']['content']['application/json'];

export const USERS_GET_CONTEXT_FOR_USER = new InjectionToken<
  (
    username: string,
    params?:
      | UsersGetContextForUserParams
      | (() => UsersGetContextForUserParams | undefined),
  ) => ReturnType<typeof httpResource<UsersGetContextForUserResponse>>
>('USERS_GET_CONTEXT_FOR_USER');

export function provideUsersGetContextForUser(): FactoryProvider {
  return {
    provide: USERS_GET_CONTEXT_FOR_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        username: string,
        params?:
          | UsersGetContextForUserParams
          | (() => UsersGetContextForUserParams | undefined),
      ) =>
        httpResource<UsersGetContextForUserResponse>(() => ({
          url: `${base}/users/${username}/hovercard`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
