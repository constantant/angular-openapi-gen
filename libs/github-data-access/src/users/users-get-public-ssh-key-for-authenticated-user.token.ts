import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersGetPublicSshKeyForAuthenticatedUserResponse =
  paths['/user/keys/{key_id}']['get']['responses']['200']['content']['application/json'];

export const USERS_GET_PUBLIC_SSH_KEY_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      keyId: string,
    ) => ReturnType<
      typeof httpResource<UsersGetPublicSshKeyForAuthenticatedUserResponse>
    >
  >('USERS_GET_PUBLIC_SSH_KEY_FOR_AUTHENTICATED_USER');

export function provideUsersGetPublicSshKeyForAuthenticatedUser(): FactoryProvider {
  return {
    provide: USERS_GET_PUBLIC_SSH_KEY_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (keyId: string) =>
        httpResource<UsersGetPublicSshKeyForAuthenticatedUserResponse>(() => ({
          url: `${base}/user/keys/${keyId}`,
        }));
    },
  };
}
