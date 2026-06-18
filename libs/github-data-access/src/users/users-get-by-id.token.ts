import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths, components } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersGetByIdResponse =
  paths['/user/{account_id}']['get']['responses']['200']['content']['application/json'];

export type UsersGetByIdError =
  paths['/user/{account_id}']['get']['responses']['404']['content']['application/json'];

export type UsersGetByIdDiscriminatorKey = 'public' | 'private';

export type UsersGetByIdPublic = components['schemas']['public-user'] & {
  user_view_type: 'public';
};

export type UsersGetByIdPrivate = components['schemas']['private-user'] & {
  user_view_type: 'private';
};

export type UsersGetByIdDiscriminated =
  | UsersGetByIdPublic
  | UsersGetByIdPrivate;

export const USERS_GET_BY_ID = new InjectionToken<
  (accountId: string) => ReturnType<typeof httpResource<UsersGetByIdResponse>>
>('USERS_GET_BY_ID');

export function provideUsersGetById(): FactoryProvider {
  return {
    provide: USERS_GET_BY_ID,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (accountId: string) =>
        httpResource<UsersGetByIdResponse>(() => ({
          url: `${base}/user/${accountId}`,
        }));
    },
  };
}
