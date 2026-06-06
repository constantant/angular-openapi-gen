import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type UsersGetPublicSshKeyForAuthenticatedUserResponse =
  paths['/user/keys/{key_id}']['get']['responses']['200']['content']['application/json'];

export const USERS_GET_PUBLIC_SSH_KEY_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      key_id: string,
    ) => ReturnType<
      typeof httpResource<UsersGetPublicSshKeyForAuthenticatedUserResponse>
    >
  >('USERS_GET_PUBLIC_SSH_KEY_FOR_AUTHENTICATED_USER', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (key_id: string) =>
        httpResource<UsersGetPublicSshKeyForAuthenticatedUserResponse>(() => ({
          url: `${base}/user/keys/${key_id}`,
        }));
    },
  });
