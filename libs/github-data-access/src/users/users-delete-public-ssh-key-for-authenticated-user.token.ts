import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersDeletePublicSshKeyForAuthenticatedUserError =
  | paths['/user/keys/{key_id}']['delete']['responses']['401']['content']['application/json']
  | paths['/user/keys/{key_id}']['delete']['responses']['403']['content']['application/json']
  | paths['/user/keys/{key_id}']['delete']['responses']['404']['content']['application/json'];

export const USERS_DELETE_PUBLIC_SSH_KEY_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (keyId: string) => ReturnType<typeof httpResource<unknown>>
  >('USERS_DELETE_PUBLIC_SSH_KEY_FOR_AUTHENTICATED_USER');

export function provideUsersDeletePublicSshKeyForAuthenticatedUser(): FactoryProvider {
  return {
    provide: USERS_DELETE_PUBLIC_SSH_KEY_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (keyId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/user/keys/${keyId}`,
          method: 'DELETE',
        }));
    },
  };
}
