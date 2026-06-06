import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type UsersListGpgKeysForUserParams =
  paths['/users/{username}/gpg_keys']['get']['parameters']['query'];

type UsersListGpgKeysForUserResponse =
  paths['/users/{username}/gpg_keys']['get']['responses']['200']['content']['application/json'];

export const USERS_LIST_GPG_KEYS_FOR_USER = new InjectionToken<
  (
    username: string,
    params?: UsersListGpgKeysForUserParams,
  ) => ReturnType<typeof httpResource<UsersListGpgKeysForUserResponse>>
>('USERS_LIST_GPG_KEYS_FOR_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (username: string, params?: UsersListGpgKeysForUserParams) =>
      httpResource<UsersListGpgKeysForUserResponse>(() => ({
        url: `${base}/users/${username}/gpg_keys`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
