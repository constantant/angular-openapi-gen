import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersDeleteSshSigningKeyForAuthenticatedUserError =
  | paths['/user/ssh_signing_keys/{ssh_signing_key_id}']['delete']['responses']['401']['content']['application/json']
  | paths['/user/ssh_signing_keys/{ssh_signing_key_id}']['delete']['responses']['403']['content']['application/json']
  | paths['/user/ssh_signing_keys/{ssh_signing_key_id}']['delete']['responses']['404']['content']['application/json'];

export const USERS_DELETE_SSH_SIGNING_KEY_FOR_AUTHENTICATED_USER =
  new InjectionToken<(sshSigningKeyId: string) => Observable<unknown>>(
    'USERS_DELETE_SSH_SIGNING_KEY_FOR_AUTHENTICATED_USER',
  );

export function provideUsersDeleteSshSigningKeyForAuthenticatedUser(): FactoryProvider {
  return {
    provide: USERS_DELETE_SSH_SIGNING_KEY_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(GITHUB_BASE_URL);
      return (sshSigningKeyId: string) =>
        http.request<unknown>(
          'DELETE',
          `${base}/user/ssh_signing_keys/${sshSigningKeyId}`,
          {},
        );
    },
  };
}
