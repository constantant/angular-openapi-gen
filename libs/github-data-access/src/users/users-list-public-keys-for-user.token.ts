import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type UsersListPublicKeysForUserParams =
  paths['/users/{username}/keys']['get']['parameters']['query'];

type UsersListPublicKeysForUserResponse =
  paths['/users/{username}/keys']['get']['responses']['200']['content']['application/json'];

export const USERS_LIST_PUBLIC_KEYS_FOR_USER = new InjectionToken<
  (
    username: string,
    params?: UsersListPublicKeysForUserParams,
  ) => ReturnType<typeof httpResource<UsersListPublicKeysForUserResponse>>
>('USERS_LIST_PUBLIC_KEYS_FOR_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (username: string, params?: UsersListPublicKeysForUserParams) =>
      httpResource<UsersListPublicKeysForUserResponse>(() => ({
        url: `${base}/users/${username}/keys`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
