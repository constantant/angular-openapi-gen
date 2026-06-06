import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type UsersListGpgKeysForAuthenticatedUserParams =
  paths['/user/gpg_keys']['get']['parameters']['query'];

type UsersListGpgKeysForAuthenticatedUserResponse =
  paths['/user/gpg_keys']['get']['responses']['200']['content']['application/json'];

export const USERS_LIST_GPG_KEYS_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    params?: UsersListGpgKeysForAuthenticatedUserParams,
  ) => ReturnType<
    typeof httpResource<UsersListGpgKeysForAuthenticatedUserResponse>
  >
>('USERS_LIST_GPG_KEYS_FOR_AUTHENTICATED_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (params?: UsersListGpgKeysForAuthenticatedUserParams) =>
      httpResource<UsersListGpgKeysForAuthenticatedUserResponse>(() => ({
        url: `${base}/user/gpg_keys`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
