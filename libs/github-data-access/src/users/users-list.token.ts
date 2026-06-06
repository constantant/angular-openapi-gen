import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersListParams = paths['/users']['get']['parameters']['query'];

export type UsersListResponse =
  paths['/users']['get']['responses']['200']['content']['application/json'];

export const USERS_LIST = new InjectionToken<
  (
    params?: UsersListParams | (() => UsersListParams | undefined),
  ) => ReturnType<typeof httpResource<UsersListResponse>>
>('USERS_LIST');

export function provideUsersList(): FactoryProvider {
  return {
    provide: USERS_LIST,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (params?: UsersListParams | (() => UsersListParams | undefined)) =>
        httpResource<UsersListResponse>(() => ({
          url: `${base}/users`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
