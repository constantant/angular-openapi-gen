import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersGetSshSigningKeyForAuthenticatedUserResponse =
  paths['/user/ssh_signing_keys/{ssh_signing_key_id}']['get']['responses']['200']['content']['application/json'];

export const USERS_GET_SSH_SIGNING_KEY_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      sshSigningKeyId: string,
    ) => ReturnType<
      typeof httpResource<UsersGetSshSigningKeyForAuthenticatedUserResponse>
    >
  >('USERS_GET_SSH_SIGNING_KEY_FOR_AUTHENTICATED_USER', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (sshSigningKeyId: string) =>
        httpResource<UsersGetSshSigningKeyForAuthenticatedUserResponse>(() => ({
          url: `${base}/user/ssh_signing_keys/${sshSigningKeyId}`,
        }));
    },
  });
