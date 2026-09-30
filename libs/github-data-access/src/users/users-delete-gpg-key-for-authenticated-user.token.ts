import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersDeleteGpgKeyForAuthenticatedUserError =
  | paths['/user/gpg_keys/{gpg_key_id}']['delete']['responses']['401']['content']['application/json']
  | paths['/user/gpg_keys/{gpg_key_id}']['delete']['responses']['403']['content']['application/json']
  | paths['/user/gpg_keys/{gpg_key_id}']['delete']['responses']['404']['content']['application/json']
  | paths['/user/gpg_keys/{gpg_key_id}']['delete']['responses']['422']['content']['application/json'];

export const USERS_DELETE_GPG_KEY_FOR_AUTHENTICATED_USER = new InjectionToken<
  (gpgKeyId: string) => Observable<unknown>
>('USERS_DELETE_GPG_KEY_FOR_AUTHENTICATED_USER');

export function provideUsersDeleteGpgKeyForAuthenticatedUser(): FactoryProvider {
  return {
    provide: USERS_DELETE_GPG_KEY_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(GITHUB_BASE_URL);
      return (gpgKeyId: string) =>
        http.request<unknown>(
          'DELETE',
          `${base}/user/gpg_keys/${gpgKeyId}`,
          {},
        );
    },
  };
}
