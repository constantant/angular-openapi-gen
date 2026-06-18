import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersDeleteGpgKeyForAuthenticatedUserError =
  | paths['/user/gpg_keys/{gpg_key_id}']['delete']['responses']['401']['content']['application/json']
  | paths['/user/gpg_keys/{gpg_key_id}']['delete']['responses']['403']['content']['application/json']
  | paths['/user/gpg_keys/{gpg_key_id}']['delete']['responses']['404']['content']['application/json']
  | paths['/user/gpg_keys/{gpg_key_id}']['delete']['responses']['422']['content']['application/json'];

export const USERS_DELETE_GPG_KEY_FOR_AUTHENTICATED_USER = new InjectionToken<
  (gpgKeyId: string) => ReturnType<typeof httpResource<unknown>>
>('USERS_DELETE_GPG_KEY_FOR_AUTHENTICATED_USER');

export function provideUsersDeleteGpgKeyForAuthenticatedUser(): FactoryProvider {
  return {
    provide: USERS_DELETE_GPG_KEY_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (gpgKeyId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/user/gpg_keys/${gpgKeyId}`,
          method: 'DELETE',
        }));
    },
  };
}
