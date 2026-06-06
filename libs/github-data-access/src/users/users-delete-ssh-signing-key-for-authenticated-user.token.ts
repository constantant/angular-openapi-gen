import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const USERS_DELETE_SSH_SIGNING_KEY_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (sshSigningKeyId: string) => ReturnType<typeof httpResource<unknown>>
  >('USERS_DELETE_SSH_SIGNING_KEY_FOR_AUTHENTICATED_USER');

export function provideUsersDeleteSshSigningKeyForAuthenticatedUser(): FactoryProvider {
  return {
    provide: USERS_DELETE_SSH_SIGNING_KEY_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (sshSigningKeyId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/user/ssh_signing_keys/${sshSigningKeyId}`,
          method: 'DELETE',
        }));
    },
  };
}
