import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths, components } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersGetAuthenticatedResponse =
  paths['/user']['get']['responses']['200']['content']['application/json'];

export type UsersGetAuthenticatedError =
  | paths['/user']['get']['responses']['401']['content']['application/json']
  | paths['/user']['get']['responses']['403']['content']['application/json'];

export type UsersGetAuthenticatedDiscriminatorKey = 'public' | 'private';

export type UsersGetAuthenticatedPublic =
  components['schemas']['public-user'] & { user_view_type: 'public' };

export type UsersGetAuthenticatedPrivate =
  components['schemas']['private-user'] & { user_view_type: 'private' };

export type UsersGetAuthenticatedDiscriminated =
  | UsersGetAuthenticatedPublic
  | UsersGetAuthenticatedPrivate;

export const USERS_GET_AUTHENTICATED = new InjectionToken<
  () => ReturnType<typeof httpResource<UsersGetAuthenticatedResponse>>
>('USERS_GET_AUTHENTICATED');

export function provideUsersGetAuthenticated(): FactoryProvider {
  return {
    provide: USERS_GET_AUTHENTICATED,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return () =>
        httpResource<UsersGetAuthenticatedResponse>(() => ({
          url: `${base}/user`,
        }));
    },
  };
}
