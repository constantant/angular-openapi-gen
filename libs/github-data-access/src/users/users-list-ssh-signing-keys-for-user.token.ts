import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type UsersListSshSigningKeysForUserParams =
  paths['/users/{username}/ssh_signing_keys']['get']['parameters']['query'];

type UsersListSshSigningKeysForUserResponse =
  paths['/users/{username}/ssh_signing_keys']['get']['responses']['200']['content']['application/json'];

export const USERS_LIST_SSH_SIGNING_KEYS_FOR_USER = new InjectionToken<
  (
    username: string,
    params?: UsersListSshSigningKeysForUserParams,
  ) => ReturnType<typeof httpResource<UsersListSshSigningKeysForUserResponse>>
>('USERS_LIST_SSH_SIGNING_KEYS_FOR_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (username: string, params?: UsersListSshSigningKeysForUserParams) =>
      httpResource<UsersListSshSigningKeysForUserResponse>(() => ({
        url: `${base}/users/${username}/ssh_signing_keys`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
