import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type UsersGetGpgKeyForAuthenticatedUserResponse =
  paths['/user/gpg_keys/{gpg_key_id}']['get']['responses']['200']['content']['application/json'];

export const USERS_GET_GPG_KEY_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    gpg_key_id: string,
  ) => ReturnType<
    typeof httpResource<UsersGetGpgKeyForAuthenticatedUserResponse>
  >
>('USERS_GET_GPG_KEY_FOR_AUTHENTICATED_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (gpg_key_id: string) =>
      httpResource<UsersGetGpgKeyForAuthenticatedUserResponse>(() => ({
        url: `${base}/user/gpg_keys/${gpg_key_id}`,
      }));
  },
});
